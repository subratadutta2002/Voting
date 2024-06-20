const express = require("express");
const app = express();
const ABI = require("./json/ABI.json");
const { Web3 } = require("web3");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const web3 = new Web3(
  "https://light-wider-model.ethereum-sepolia.quiknode.pro/f4ddbba574f255f0de93aa420ce77b7701d00dfd/"
);

const contractAddress = "0x6ecb892c214348246e7710e62213AF6051901AaE";
const contract = new web3.eth.Contract(ABI, contractAddress);

app.post("/check-owner", async (req, res) => {
  try {
    const { account } = req.body;
    if (!account) {
      return res.status(400).json({ error: "Account address is required" });
    }

    const owner = await contract.methods.owner().call();
    if (owner.toLowerCase() === account.toLowerCase()) {
      return res.json({ result: 1 });
    } else {
      return res.json({ result: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/verifyVoter", async (req, res) => {
  const { VoterId, MobileNo } = req.body;

  try {
    const response = await contract.methods
      .verifyVoter(VoterId, MobileNo)
      .call();

    const responseNumber = BigInt(response).toString();
    console.log(responseNumber);

    if (responseNumber === "1") {
      res.status(200).json({
        status: 200,
        message: "Valid User",
        result: 1,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Invalid User",
        result: 0,
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send("An error occurred during authentication.");
  }
});

app.post("/getRegVoterDataset", async (req, res) => {
  try {
    const { referenceId } = req.body;
    if (!referenceId) {
      return res.status(400).json({ error: "Reference ID is required" });
    }

    const regVoterData = await contract.methods
      .getRegVoterDataset(referenceId)
      .call();

    if (regVoterData.name) {
      return res.status(200).json({
        name: regVoterData.name,
        age: Number(regVoterData.age),
        referenceId: regVoterData.referenceId,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Registration data not found for the provided reference ID",
    });
  }
});

app.post("/checkReferenceIdUsed", async (req, res) => {
  try {
    const { referenceId } = req.body;
    if (!referenceId) {
      return res.status(400).json({ error: "Reference ID is required" });
    }

    const isUsed = await contract.methods.referenceIdUsed(referenceId).call();

    if (!isUsed) {
      return res.json({ result: 1 });
    } else {
      return res.json({ result: 0 });
    }
  } catch (error) {
    console.error("Error in checking reference ID usage:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking reference ID usage" });
  }
});

app.post("/CrimeRecordExist", async (req, res) => {
  try {
    const { VoterID } = req.body;
    if (!VoterID) {
      return res.status(400).json({ error: "Voter ID is required" });
    }

    const isUsed = await contract.methods.crimeRecords(VoterID).call();

    if (!isUsed) {
      return res.json({ result: 0 });
    } else {
      return res.json({ result: 1 });
    }
  } catch (error) {
    console.error("Error in checking Voter ID usage:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking Voter ID usage" });
  }
});

app.post("/VoterIDExist", async (req, res) => {
  try {
    const { VoterID } = req.body;
    if (!VoterID) {
      return res.status(400).json({ error: "Voter ID is required" });
    }

    const isUsed = await contract.methods.voters(VoterID).call();

    if (isUsed.name == "") {
      return res.json({ result: 0 });
    } else {
      return res.json({ result: 1 });
    }
  } catch (error) {
    console.error("Error in checking Voter ID usage:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking Voter ID usage" });
  }
});

app.post("/VoterIdDetails", async (req, res) => {
  try {
    const { VoterID } = req.body;
    if (!VoterID) {
      return res.status(400).json({ error: "Voter ID is required" });
    }

    const isUsed = await contract.methods.voters(VoterID).call();
    if (isUsed.name === "") {
      return res.json({ result: 0 });
    } else {
      return res.json({
        result: 1,
        voter: {
          name: isUsed.name,
          age: Number(isUsed.age),
          gender: isUsed.gender,
          citizen: isUsed.citizen,
          mobileNumber: isUsed.mobileNumber.toString(),
        },
      });
    }
  } catch (error) {
    console.error("Error in checking Voter ID usage:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking Voter ID usage" });
  }
});

app.post("/isCandidateNominated", async (req, res) => {
  try {
    const { VoterID } = req.body;
    if (!VoterID) {
      return res.status(400).json({ error: "Voter ID is required" });
    }

    const isUsed = await contract.methods.isCandidateNominated(VoterID).call();
    if (isUsed == true) {
      return res.json({ result: 1 });
    } else {
      return res.json({ result: 0 });
    }
  } catch (error) {
    console.error("Error in checking Voter ID usage:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking Voter ID usage" });
  }
});

app.get("/getAllCandidates", async (req, res) => {
  try {
    const candidateIds = await contract.methods.getAllCandidateIds().call();
    const candidates = await Promise.all(
      candidateIds.map(async (id) => {
        const candidate = await contract.methods.candidates(id).call();
        return {
          name: candidate.name,
          voterId: candidate.voterId,
        };
      })
    );
    res.json(candidates);
  } catch (error) {
    sendErrorResponse(res, error, "Failed to get all candidates");
  }
});

app.get("/votersList", async (req, res) => {
  try {
    const AllVoterIds = await contract.methods.getAllVoterIds().call();
    res.json({ voterIds: AllVoterIds });
  } catch (error) {
    console.error("Failed to get all voter IDs:", error);
    res.status(500).json({ error: "Failed to get all voter IDs" });
  }
});

app.use("/", (req, res) => {
  res.json({ message: "Welcome Voting API" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
