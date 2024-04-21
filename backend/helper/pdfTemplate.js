const generateInvoiceHTML = ({
  testName,
  isPassed,
  name,
  correctAns,
  wrongAns,
}) => {
  const today = new Date();
  return `
  <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          body{margin-top: 250px}

             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }

             .success{
             color: green;
             }

             .danger{
             color: red;
             }
             .test-heading{
                text-transform: uppercase;
                text-align:center;
             font-size: 32px;
             color: navy;
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <h1 class='test-heading'>RESULT - ${testName}</h1>
             <table cellpadding="0" cellspacing="0">
                
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Candidate name: ${name}
                            </td>
                            <td>
                               Result: ${isPassed ? "Passed" : "Failed"}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Infomation</td>
                 <td></td>
                </tr>
                <tr class="item">
                   <td>Correct Answers:</td>
                   <td>${correctAns}</td>
                </tr>
                <tr class="item">
                   <td>Wrong Answers:</td>
                   <td>${wrongAns}</td>
                </tr>
                <tr class="item">
                   <td>Total Marks:</td>
                   <td>${correctAns} / ${correctAns + wrongAns}</td>
                </tr>
             </table>
             <br />
             <h1 class="justify-center">${isPassed
      ? "<span class='success'>You have successfully passed the test Congrats!</span>"
      : "<span class='danger'>You haven't passed the Exam better luck next time!</span>"
    }</h1>
          </div>
       </body>
    </html>
    `;
};
export default generateInvoiceHTML;