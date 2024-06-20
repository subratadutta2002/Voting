// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    address public owner;
    bool public votingOpen;
    string public winnerCandidateId;

    struct RegVoterDataset {
        string name;
        uint8 age;
        string referenceId;
    }

    struct Voter {
        string name;
        uint8 age;
        string gender;
        string citizen;
        string mobileNumber;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        uint8 age;
        string voterId;
        string crimeRecord;
        string property;
        uint256 voteCount;
    }

    mapping(string => RegVoterDataset) public regVoterData;
    string[] public regVoterDatas;
    mapping(string => Voter) public voters;
    string[] public voterIds;
    mapping(string => Candidate) public candidates;
    string[] public candidateIds;
    mapping(string => string) public crimeRecords;
    mapping(string => bool) public referenceIdUsed;
    uint256 public candidateCount;

    event VoteCasted(string voterId, string candidateId);
    event VotingStarted();
    event VotingClosed();

    constructor() {
        owner = msg.sender;
        votingOpen = false;
        winnerCandidateId = "";
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can perform this action"
        );
        _;
    }

    modifier onlyWhenVotingOpen() {
        require(votingOpen, "Voting is closed");
        _;
    }

    function startVoting() external onlyOwner {
        require(!votingOpen, "Voting is already open");
        votingOpen = true;
        winnerCandidateId = ""; // Clear the winner when voting is restarted
        emit VotingStarted();
    }

    function closeVoting() external onlyOwner {
        require(votingOpen, "Voting is already closed");
        votingOpen = false;
        resetAllVoterStatus();
        winnerCandidateId = determineWinner(); // Set the winner when voting is closed
        emit VotingClosed();
    }

    function resetAllVoterStatus() internal {
        for (uint256 i = 0; i < voterIds.length; i++) {
            voters[voterIds[i]].hasVoted = false;
        }
    }

    function createRegVoterData(string memory _name, uint8 _age) public {
        require(_age >= 18, "Voter must be at least 18 years old");

        uint256 uniqueNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, _name, _age))
        ) % 100000;
        string memory referenceId = string(
            abi.encodePacked("REF", uintToString(uniqueNumber))
        );

        require(
            bytes(regVoterData[referenceId].name).length == 0,
            "Reference ID already exists"
        );

        regVoterData[referenceId] = RegVoterDataset({
            name: _name,
            age: _age,
            referenceId: referenceId
        });

        regVoterDatas.push(referenceId);
    }

    function getRegVoterDataset(
        string memory _referenceId
    )
        public
        view
        returns (string memory name, uint8 age, string memory referenceId)
    {
        RegVoterDataset memory dataset = regVoterData[_referenceId];
        require(bytes(dataset.name).length > 0, "Reference ID not found");

        name = dataset.name;
        age = dataset.age;
        referenceId = dataset.referenceId;
    }

    function getLatestRegVoterReferenceId()
        public
        view
        returns (string memory)
    {
        require(regVoterDatas.length > 0, "No registered voters yet");
        return regVoterDatas[regVoterDatas.length - 1];
    }

    function regVoter(
        string memory _referenceId,
        string memory _gender,
        string memory _citizen,
        string memory _mobileNumber
    ) public {
        require(bytes(_referenceId).length > 0, "Invalid reference ID");
        require(
            bytes(regVoterData[_referenceId].name).length > 0,
            "Reference ID not found"
        );
        require(
            !referenceIdUsed[_referenceId],
            "Reference ID has already been used"
        );

        string memory voterId = generateVoterId(
            regVoterData[_referenceId].name,
            _mobileNumber
        );
        require(
            bytes(voters[voterId].name).length == 0,
            "Voter already registered"
        );

        voters[voterId] = Voter({
            name: regVoterData[_referenceId].name,
            age: regVoterData[_referenceId].age,
            gender: _gender,
            citizen: _citizen,
            mobileNumber: _mobileNumber,
            hasVoted: false
        });

        voterIds.push(voterId);
        referenceIdUsed[_referenceId] = true;
    }

    function verifyVoter(
        string memory _voterId,
        string memory _mobileNumber
    ) public view returns (uint8) {
        if (bytes(voters[_voterId].name).length == 0) {
            return 0;
        }
        if (
            keccak256(bytes(voters[_voterId].mobileNumber)) !=
            keccak256(bytes(_mobileNumber))
        ) {
            return 0;
        }
        return 1;
    }

    function addCrimeRecord(
        string memory _voterId,
        string memory _crimeRecord
    ) public onlyOwner {
        require(bytes(voters[_voterId].name).length > 0, "Voter ID not found");
        require(
            bytes(crimeRecords[_voterId]).length == 0,
            "Crime record already exists for this voter ID"
        );
        crimeRecords[_voterId] = _crimeRecord;
    }

    function nominateCandidate(
        string memory _voterId,
        string memory _property
    ) public {
        require(bytes(_voterId).length > 0, "Invalid voter ID");
        require(bytes(voters[_voterId].name).length > 0, "Voter ID not found");
        require(
            voters[_voterId].age >= 25,
            "Candidate must be at least 25 years old"
        );
        require(
            bytes(crimeRecords[_voterId]).length == 0,
            "Voter has a crime record"
        ); // Check crime record
        require(!isCandidateNominated(_voterId), "Candidate already nominated");

        candidates[_voterId] = Candidate({
            name: voters[_voterId].name,
            age: voters[_voterId].age,
            voterId: _voterId,
            crimeRecord: crimeRecords[_voterId],
            property: _property,
            voteCount: 0
        });

        candidateIds.push(_voterId);
        candidateCount++;
    }

    function vote(
        string memory _voterId,
        string memory _candidateId,
        string memory _mobileNumber
    ) public onlyWhenVotingOpen {
        require(!voters[_voterId].hasVoted, "Voter has already voted");
        require(
            bytes(candidates[_candidateId].name).length > 0,
            "Candidate does not exist"
        );
        require(
            keccak256(bytes(voters[_voterId].mobileNumber)) ==
                keccak256(bytes(_mobileNumber)),
            "Invalid mobile number"
        );

        voters[_voterId].hasVoted = true;
        candidates[_candidateId].voteCount++;

        emit VoteCasted(_voterId, _candidateId);
    }

    function getVoteCount(
        string memory _candidateId
    ) public view returns (uint256) {
        require(
            bytes(candidates[_candidateId].name).length > 0,
            "Candidate does not exist"
        );
        return candidates[_candidateId].voteCount;
    }

    function getAllVoterIds() public view returns (string[] memory) {
        return voterIds;
    }

    function getAllCandidateIds() public view returns (string[] memory) {
        return candidateIds;
    }

    function getLatestRegisteredVoterId() public view returns (string memory) {
        require(voterIds.length > 0, "No voters registered yet");
        return voterIds[voterIds.length - 1];
    }

    function generateVoterId(
        string memory _name,
        string memory _mobileNumber
    ) internal view returns (string memory) {
        uint256 uniqueNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, _name, _mobileNumber))
        ) % 100000;
        string memory voterId = string(
            abi.encodePacked("WB", uintToString(uniqueNumber))
        );
        return voterId;
    }

    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function determineWinner()
        internal
        view
        returns (string memory winnerCandidateId)
    {
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < candidateIds.length; i++) {
            uint256 candidateVoteCount = candidates[candidateIds[i]].voteCount;
            if (candidateVoteCount > maxVotes) {
                maxVotes = candidateVoteCount;
                winnerCandidateId = candidateIds[i];
            }
        }

        require(bytes(winnerCandidateId).length > 0, "No winner found");

        return winnerCandidateId;
    }

    function isAdmin(address account) public view returns (bool) {
        return account == owner;
    }

    function hasVoted(string memory _voterId) public view returns (bool) {
        return voters[_voterId].hasVoted;
    }

    function isCandidateNominated(
        string memory _voterId
    ) public view returns (bool) {
        return bytes(candidates[_voterId].name).length > 0;
    }
}

//0x6ecb892c214348246e7710e62213AF6051901AaE