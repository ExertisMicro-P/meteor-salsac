/**
 * @author Exertis Micro-P
 */

function randomProductLabel() {
  var productlabels = ['Samsung','iPhone','Sony'];
  var rand = productlabels[Math.floor(Math.random() * productlabels.length)];
  return rand;
}





product = {
  deductfromsalary: {'orange_solo-25': '22.20', 'orange_solo-30': '25.32', '3_oneplan': 99.99},
  filter: '1000,Unlmited',
  frontpageimage: 'https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=1003',
  handsetcode: 'BLACKBERRY9320',
  hugeimage:"https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=1001",
  label:"Blackberry Curve 9320",
  largeimage:"https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=1002",
  specimage:"https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=1000",
  tariffs: ['orange_solo-25', 'orange_solo-30', '3_oneplan']
};

if (Products.find().count() === 0) {
 
 	  
  for (var i = 0; i < 23; i++) {
  	
    //product.label = randomProductLabel();
    Products.insert(product);
   
  }
  
  Tariffs.insert({name: 'orange_solo-25', 
                  details: {network: 'Orange', 
                            networklogo: "https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=168",
                            other: ["Orange contracts are managed through Micro-P - all inquiries relating to your Orange contract can be dealt with by our customer service team (0870 4607709)",
                                   ],
                            tariffname: "Orange Solo - 25",
                            texts: "1000",
                            voice: "1000mins",
                            web: "500MB"
                           }
                 });
  
  Tariffs.insert({name: '3_oneplan',
                  details: {network: '3', 
                  networklogo: "https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=110",
                  other: ["Bundle details may vary based on the top-up you apply - visit www.three.co.uk for more details. Get 3000 texts and 300 minutes plus all-you-can-eat data for just £15. Get 3000 texts and 100 minutes plus 500MB of internet for just £10",
                         ],
                  tariffname: "3 PAYG",
                  texts: "0",
                  voice: "0mins",
                  web: "0"
                 }
                 });
  
  Tariffs.insert({name: 'orange_solo-30', 
                  details: {network: 'Orange', 
                            networklogo: "https://www.employeescheme.co.uk/ems/scheme-manager/image.php?image=168",
                            other: ["Orange contracts are managed through Micro-P - all inquiries relating to your Orange contract can be dealt with by our customer service team (0870 4607709)",
                                   ],
                            tariffname: "Orange Solo - 30",
                            texts: "Unlimited",
                            voice: "Unlimitedmins",
                            web: "1GB"
                           }
                 });
                  
                  
  
  
  
}