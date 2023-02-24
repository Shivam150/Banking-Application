const prompt = require("prompt-sync")();
let E_mail;
let Name;
let Mno;
let AdhaarNo;
let Zipcode;
let Amount;
let AccBalance=0;
let WtM;
let Interest;
let EMI = 0;
let choice;
let BorrowAmount;
let Duration;
let PendingLoan;
let PaidEmi;
let OutstandingLoan;
let leftEmi;
let keyPass;
function CreateAccount(){
    E_mail =  prompt("Enter Your Email:- ");
    var validMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(E_mail.match(validMail))
    {
        console.log(E_mail);
    }
    else{
        console.log("Invalid Email! Enter Again");
        CreateAccount();
    }
    MobileValidation();
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
    
    NameValidation();
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

    AdhaarValidation();

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
    ZipValidation();
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
    console.log("<======== ACCOUNT-CREATED =========>");

    AccNumber = Math.floor(Math.random()*9000000000)+10;
}

function DepositM()
{
    
    Amount = parseFloat(prompt("Enter Balance To Deposit: "));
    AccBalance = AccBalance+Amount;
    console.log(`Funds Deposited To your Account No ${AccNumber}`);

}

function WithdrawAmount()
{
    WtM = parseFloat(prompt("Enter Amount You wish to Withdraw: "));
    if(AccBalance>=WtM)
    {
      console.log(`Amount ${WtM} Withdraw From Your Account!`);
      AccBalance = AccBalance-WtM;
    }
    else{
        console.log("Insuficient Funds!");
    }  
}

function GetLoan(){
    BorrowAmount = parseFloat(prompt("Enter Amount You Wish to Borrow: "));
    Duration = parseInt(prompt("Enter Duration In Months Or tenure: "));
    console.log(`Congratulation Your Loan Amount of ${BorrowAmount} Disburst to Your Account Number ${AccNumber} at 14% PA`);
    AccBalance = AccBalance+BorrowAmount;
    Interest = (BorrowAmount*14)/100;
    OutstandingLoan = BorrowAmount + Interest; 
    EMI =  EMI+ (OutstandingLoan)/Duration;
    PendingLoan = OutstandingLoan-EMI;
    PaidEmi = Duration - (PendingLoan/EMI);
    leftEmi = PendingLoan/EMI;
}

function ShowDetails()
{
    console.log("<======Account Details========>");

    console.log("Name :",Name);
    console.log("Email Id :",E_mail);
    console.log("Mobile Number +91 ",Mno);
    console.log("Address PinCode :",Zipcode);
    console.log("Account Number is:-" , AccNumber);
    console.log("Account Balance: ",AccBalance);
    console.log("Outstanding Loan: ",OutstandingLoan);
    console.log(`Monthly EMI For ${Duration} Months: `,EMI);
    console.log("Number of EMI Paid: ",PaidEmi);
    console.log("Number of EMI Left To Pay: ",leftEmi);
    console.log("Pending Loan: ",PendingLoan);
}

console.log(">>>>>>>>>>>>===============-BANKING APPLICATION-=================<<<<<<<<<<<<<");

console.log("Select An Option: ");
console.log("Press 1 to create Account:");
console.log("Press 2 to Deposit Funds:");
console.log("Press 3 to Withdraw Money:");
console.log("Press 4 to Get Loan:");
console.log("Press 5 to Show Details:");
while(choice!=0){
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
            ShowDetails();
            break;
        
        default:
            console.log("Please Enter Valid Choice:")
    }  
}


