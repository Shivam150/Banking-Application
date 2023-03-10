const prompt = require("prompt-sync")();
let E_mail;
let Name;
let Mno;
let AdhaarNo;
let Zipcode;
let Amount;
let AccNumber;
let AccBalance=0;
let WtM;
let Interest;
let EMI = 0;
let choice;
let BorrowAmount=0;
let Duration;
let PaidEmi;
let OutstandingLoan=0;
// let Users;
let keyPass;
let payEMIs;
let exit;
let user;
let user1

const Users= [];



function CreateAccount(){
    E_mail =  prompt("Enter Your Email: ");
    var validMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    user ={
      H_Name : "",
      EMail : "",
      MobN : "",
      AddressPin : "",
      AccountNo : "",
      AccountBlc : 0,
      EMIPAID : 0,
      PendingLoan : 0
    };
    
    if(E_mail.match(validMail))
    {
        console.log(E_mail);
    }
    else{

        console.log("Invalid Email! Enter Again");
        CreateAccount();
    }
    MobileValidation();
    NameValidation();
    AdhaarValidation();
    ZipValidation();

    console.log("<======== ACCOUNT-CREATED =========>");
    //console.log(Users);
    AccNumber = Math.floor(Math.random()*9000000000)+10;
    let user1=user;
    user1.H_Name = Name;
    user1.EMail = E_mail;
    user1.MobN = Mno;
    user1.AddressPin = Zipcode;
    user1.AccountNo = AccNumber;
    user1.AccountBlc = AccBalance;
    user1.EMIPAID = PaidEmi;
    user1.PendingLoan = OutstandingLoan;
    Users.push(user1); 

}


function MobileValidation()
{
  Mno = prompt("Enter your Mobile Number +91: ");
  var validNumber = /^(\d{3})(\d{3})(\d{4})$/;
  if(Mno.match(validNumber))
  {
    console.log(Mno);
  }
  else{
    console.log("Invalid Mobile number!");
    MobileValidation();
  }
}

function NameValidation()
{
 Name = prompt("Enter Your Name: ");
 var  validName = /^[a-zA-Z]+[ ]?[a-zA-Z]+$/;
 if(Name.match(validName))
  {
  console.log(Name);

  }
 else{
  console.log("Invalid Name!");
  NameValidation();
 }
}

function AdhaarValidation(){
 AdhaarNo = prompt("Enter Your Adhaar Number : ");
 var validadhaar = /^(\d{4})(\d{4})(\d{4})$/;
 if(AdhaarNo.match(validadhaar))
 {
    console.log(AdhaarNo);
 }
 else{
    console.log("Invalid adhaar number!");
    AdhaarValidation();
  }
}

function ZipValidation()
{
  Zipcode = prompt("Enter your Pincode: "); 
  var validPinCode = /^(\d{3})(\d{3})$/;
  if(Zipcode.match(validPinCode))
  {
  console.log(Zipcode);
  }
  else
  {
       console.log("Invalid Pincode!");
     ZipValidation();
  } 
}    

function DepositM()
{
  keyPass = prompt("Enter Your Key To Deposit Funds: ");

  for(let i=0; i<Users.length;i++)
  {
    if(Users[i].EMail == keyPass)
    {
      Amount = parseFloat(prompt("Enter Balance To Deposit: "));
      if(Amount>=1)
      {
        let user1=user;
        Users[i].AccountBlc = Users[i].AccountBlc+Amount;
        // user1.AccountBlc = AccBalance; 
        console.log(`Funds Deposited To your Account No ${AccNumber}`);
        
      }

      else{
        console.log("Amount Should be Greater than or Equal to 1 Rs!");
        DepositM(); 
      }
      break;

    }
    
    else{
        console.log("Access Denied!");
        exit = prompt("Press 0 to Exit OR Press Any Key To Continue: ");
        while(exit!=0)
        {
          DepositM();
        }
    }
  }

   
}

function WithdrawAmount()
{

  keyPass = prompt("Enter Your Key TO Withdraw Funds: ")
  for(let i =0;i<Users.length;i++)
  {
    if(Users[i].EMail == keyPass)
    {
      WtM = parseFloat(prompt("Enter Amount You wish to Withdraw: "));
      if(WtM>=1)
      {
        if(Users[i].AccountBlc>=WtM)
        {
        console.log(`Amount ${WtM} Debited From Your Account!`);
        Users[i].AccountBlc = Users[i].AccountBlc-WtM; 

        // user1=user;
        // user1.AccountBlc = AccBalance;
        }
        else{
         console.log("Insuficient Funds!");
         exit = prompt("Press 0 to Exit OR Press Any Key To Continue: ");
         while(exit!=0)
         {
          WithdrawAmount();
         } 
        } 
      } 
      else{
        console.log("Withdrawal Amount should be Greater than or equal to 1 Rs And use Numeric Digit Only:");
        WithdrawAmount(); 
      } 

     break; 
    }
   else{
    console.log("Enter Valid Key!");
    exit = prompt("Press 0 to Exit OR Press Any Key To Continue: ");
        while(exit!=0)
        {
          WithdrawAmount();
        }
   }
 }
}

function GetLoan()
{
   keyPass = prompt("Enter Your Pass Key To Get Loan:");

  for(let i=0;i<Users.length;i++)
  {
    if(Users[i].EMail == keyPass)
    {
      if(Users[i].PendingLoan<=500)
      {
         BorrowAmount = parseFloat(prompt("Enter Amount You Wish to Borrow But Loan Amount should be 500 Or more: "));
        if(BorrowAmount>=500)
        {
           Duration = parseInt(prompt("Enter Duration In Months Or tenure: "));
           console.log(`Congratulation Your Loan Amount of ${BorrowAmount} Disburst to Your Account Number ${AccNumber} at 14% PA`);
           Users[i].AccountBlc = Users[i].AccountBlc+BorrowAmount;
           Interest = (BorrowAmount*14)/100;
           Users[i].PendingLoan = BorrowAmount + Interest; 
           EMI =  EMI+ (Users[i].PendingLoan)/Duration;
           
        }
        else
        {
           console.log("Please Enter Valid Loan Amount!");
           GetLoan();   
        }
      }
      else
      {
        console.log("Sorry! You Have a Pending Loan!")

      } 
      
      break;
    }
   else{
      exit = prompt("Press 0 to Exit OR Press Any Key To Continue: ");
        while(exit!=0)
        {
          GetLoan();
        }
    } 
  }  
}

function RepaymentLoan()
{

  keyPass = prompt("Enter key TO Pay EMI: ")
  for(let i=0;i<Users.length;i++)
  {  
    if(Users[i].EMail == keyPass)
    {

     payEMIs = parseInt(prompt("Enetr How much EMI You wants to Pay: "));

     if(payEMIs>=1)
     {
       if(payEMIs<=Duration)
       {
         Users[i].EMIPAID= payEMIs;
         leftEmi = Duration - payEMIs;
         Users[i].AccountBlc = Users[i].AccountBlc-(payEMIs*EMI);
         Users[i].PendingLoan = Users[i].PendingLoan-(payEMIs*EMI);

         if(Users[i].PendingLoan<0)
         {
          console.log("Thanks! You Have Paid your all EMIs, There is No Pending EMIs");
           Users[i].PendingLoan = 0;
         }
         else{
            Users[i].PendingLoan;
         }
         console.log(`You Have Paid ${PaidEmi} EMIs!`);
        }
       else{
        console.log("Enter EMIs less than or Equal to Duration:");
        RepaymentLoan();
        }
      }
      else{
        console.log("Pay At-least 1 EMI!");
        RepaymentLoan();  
      }

      break;
   }
    else{
    console.log("Access Denied!");
    exit = prompt("Press 0 to Exit OR Press Any Key To Continue: ");
        while(exit!=0)
        {
          RepaymentLoan();
        }
    }

  }
}

function ShowDetails()
{
    keyPass = prompt("Enter Authorized Key To Access Details: ");
    for(let i=0; i<Users.length;i++)
    {
      // console.log(i);
      if(Users[i].EMail == keyPass)
      {
        console.log(Users[i]);
        break;
      }
    }

    // console.log("Array Values:-");
    // console.log(Users);
  
}


console.log(">>>>>>>>>>>>===============-BANKING APPLICATION-=================<<<<<<<<<<<<<");

while(choice!=0){
    console.log("Select An Option: ");
    console.log("Press 1 to create Account:");
    console.log("Press 2 to Deposit Funds:");
    console.log("Press 3 to Withdraw Money:");
    console.log("Press 4 to Get Loan:");
    console.log("Press 5 to Repayment Loan EMIs:")
    console.log("Press 6 to Show Details:");

    choice = parseInt(prompt("Select Your Choice: "));

    switch (choice) {
        case 1:
           console.log("Enter Your Personal Details To Create Account::>");
           CreateAccount();
           break;
        case 2:
            DepositM();
            break;
        case 3:
            WithdrawAmount();
            break;
        case 4:
            GetLoan(); 
            break;
        case 5:
            RepaymentLoan();
            break;    
        case 6:
            ShowDetails();
            break;
        default:
            console.log("Please Enter Valid Choice:")
    }  
}
