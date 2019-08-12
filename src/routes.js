"use strict";

const Router = require("koa-router");
const homeController = require("./controllers/home");
const walletController = require("./controllers/wallet");
const transactionsController = require("./controllers/transactions");
const beneficiaryController = require("./controllers/beneficiary");
const autoNumberController = require("./controllers/autoNumber");
const fxFeesController = require("./controllers/fxFees");
const caseController = require("./controllers/case")

const auth = require("./middlewares/auth");
auth.authorize();

const router = new Router();
router.get("/", homeController.welcome);

//Wallet

router.get("/wallet",  auth.getToken, walletController.getWallets);
router.get("/wallet/:faid",  auth.getToken, walletController.getWallet);
router.put("/wallet/:faid/updatebalance",  auth.getToken, walletController.updateWalletBalance);

//Transactions

router.get("/transactions",  auth.getToken, transactionsController.getTransactions);
router.get("/wallet/:faid/transactions",  auth.getToken, transactionsController.getTransactionsbyWallet);
router.post("/wallet/:faid/transactions",  auth.getToken, transactionsController.createTransactionsbyWallet);

//Beneficiary

router.get("/beneficiary",  auth.getToken, beneficiaryController.getBeneficiaries);
router.get("/beneficiary/:bid",  auth.getToken, beneficiaryController.getBeneficiary);
router.post("/beneficiary",  auth.getToken, beneficiaryController.createBeneficiary);
router.get("/beneficiary-Requirement/:Countrycode/:currencycode",  auth.getToken, beneficiaryController.getBeneficiaryRequirement);

// Auto Numbering
router.get("/autonumbering/:anid",  auth.getToken, autoNumberController.getAutoNumber);
router.put("/autonumbering/:anid",  auth.getToken, autoNumberController.updateAutoNumber);

// FX margin
router.get("/fx-fees/:fxid",  auth.getToken, fxFeesController.getFXFees);

//case
router.post("/case", auth.getToken, caseController.createCase)

module.exports = router;
