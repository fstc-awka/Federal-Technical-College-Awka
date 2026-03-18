const amountMap = {
      'ST3_day': 25400, 'ST3_boarder': 55400,
      'ST2_day': 17400, 'ST2_boarder': 47400,
      'ST1_day': 17400, 'ST1_boarder': 47400,
      'SS3_day': 30150, 'SS3_boarder': 60150,
      'SS2_day': 17400, 'SS2_boarder': 47400,
      'SS1_day': 17400, 'SS1_boarder': 47400,
      'JSS3_day': 16400, 'JSS3_boarder': 46400,
      'JSS2_day': 17400, 'JSS2_boarder': 47400,
      'JSS1_day': 17400, 'JSS1_boarder': 47400
    };

    const ptaAmountMap = {
      'TVET1_day': 5000, 'TVET1_boarder': 5000,
      'ST3_day': 12000, 'ST3_boarder': 12000,
      'ST2_day': 12000, 'ST2_boarder': 12000,
      'ST1_day': 12000, 'ST1_boarder': 12000,
      'SS3_day': 12000, 'SS3_boarder': 12000,
      'SS2_day': 12000, 'SS2_boarder': 12000,
      'SS1_day': 12000, 'SS1_boarder': 12000,
      'JSS3_day': 12000, 'JSS3_boarder': 12000,
      'JSS2_day': 12000, 'JSS2_boarder': 12000,
      'JSS1_day': 12000, 'JSS1_boarder': 12000
    };

    function getClassGroup(classValue) {
      if (!classValue) return '';
      const match = classValue.match(/^(TVET1|ST[1-3]|SS[1-3]|JSS[1-3])/i);
      return match ? match[1].toUpperCase() : '';
    }

    function updateAmountField() {
      let activeSection = document.querySelector('.dynamic-section.active');
      if (!activeSection) return;

      const sectionId = activeSection.id;
      
      // Dynamically locate elements within the currently active section
      const classSelect = activeSection.querySelector('select[id*="class"]');
      const studentTypeSelect = activeSection.querySelector('select[id*="studentType"]');
      const termSelect = activeSection.querySelector('input[id*="term"]');
      const amountInput = activeSection.querySelector('input[id*="amount"]');
      
      if (!classSelect || !studentTypeSelect || !termSelect || !amountInput) return;
      
      const classGroup = getClassGroup(classSelect.value);
      const studentType = studentTypeSelect.value;
      const term = termSelect.value;
      
      if (!classGroup || !studentType || term !== '3rd Term') {
        amountInput.value = '';
        return;
      }
      
      let key = `${classGroup}_${studentType}`;
      let amount;

      // Apply independent maps based on the specific section dynamically
      if (sectionId === 'sec_school_fees') {
          amount = amountMap[key];
      } else if (sectionId === 'sec_pta') {
          amount = ptaAmountMap[key];
      }
      
      if (amount) {
        amountInput.value = `₦${amount.toLocaleString()}`;
      } else {
        amountInput.value = '';
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('paymentForm');
      if (form) {
        form.addEventListener('change', updateAmountField);
        form.addEventListener('input', updateAmountField);
      }
    });


      window.addEventListener('DOMContentLoaded', function() {
        var fullNameInput = document.getElementById('fullName');
        if (fullNameInput) {
          fullNameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
          });
        }
        
        // Initialize disabling of hidden sections when page loads
        selectPayment('school_fees');
      });
      
      function selectPayment(type) {
          // Remove active classes from all tab buttons
          document.getElementById('lbl_school_fees').classList.remove('active');
          document.getElementById('lbl_pta').classList.remove('active');
          
          // Add active class to clicked tab
          document.getElementById('lbl_' + type).classList.add('active');

          // Loop through all sections: hide them and DISABLE their inputs
          const sections = ['school_fees', 'pta'];
          sections.forEach(sec => {
              const sectionEl = document.getElementById('sec_' + sec);
              sectionEl.classList.remove('active');
              const inputs = sectionEl.querySelectorAll('input, select, button');
              inputs.forEach(input => input.disabled = true);
          });
          
          // Show the active section and ENABLE its inputs
          const activeSecEl = document.getElementById('sec_' + type);
          activeSecEl.classList.add('active');
          const activeInputs = activeSecEl.querySelectorAll('input, select, button');
          activeInputs.forEach(input => input.disabled = false);

          setTimeout(updateAmountField, 50); 
      }

      function closePdfModal() {
          document.getElementById('pdfModalOverlay').style.display = 'none';
          document.getElementById('invoiceContainer').innerHTML = ''; 
      }

      let currentPaymentPayload = {}; 

      // Function to return exact fee items array based on Class Group & Type
      function getFeeItems(classGrp, studentType) {
          let items = [];
          
          if (classGrp === 'JSS3') {
              items = [
                  { name: 'SPECIAL CAUTION FEE', amount: 5000 },
                  { name: 'SKOOL MEDIA', amount: 3000 },
                  { name: 'ICT TRAINING', amount: 2000 },
                  { name: 'MEDICAL', amount: 2000 },
                  { name: 'UTILITIES', amount: 2000 },
                  { name: 'SECURITY', amount: 1000 },
                  { name: 'WEBSITE/E-RESULT', amount: 1000 },
                  { name: 'RRR', amount: 400 }
              ];
          } else if (classGrp === 'SS3') {
              items = [
                  { name: 'MAGAZINE/GRADUATION LEVY', amount: 5000 },
                  { name: 'SPECIAL CAUTION FEE', amount: 5000 },
                  { name: 'ADDITIONAL NECO FEE', amount: 4750 },
                  { name: 'SKOOL MEDIA', amount: 3000 },
                  { name: 'EXTRA LESSON', amount: 2000 },
                  { name: 'ICT TRAINING', amount: 2000 },
                  { name: 'MEDICAL', amount: 2000 },
                  { name: 'UTILITIES', amount: 2000 },
                  { name: 'CLUBS AND SOCIETIES', amount: 1000 },
                  { name: 'SECURITY', amount: 1000 },
                  { name: 'VOCATIONAL', amount: 1000 },
                  { name: 'WEBSITE/E-RESULT', amount: 1000 },
                  { name: 'RRR', amount: 400 }
              ];
          } else if (classGrp === 'ST3') {
              items = [
                  { name: 'MAGAZINE/GRADUATION LEVY', amount: 5000 },
                  { name: 'SPECIAL CAUTION FEE', amount: 5000 },
                  { name: 'SKOOL MEDIA', amount: 3000 },
                  { name: 'EXTRA LESSON', amount: 2000 },
                  { name: 'ICT TRAINING', amount: 2000 },
                  { name: 'MEDICAL', amount: 2000 },
                  { name: 'UTILITIES', amount: 2000 },
                  { name: 'CLUBS AND SOCIETIES', amount: 1000 },
                  { name: 'SECURITY', amount: 1000 },
                  { name: 'VOCATIONAL', amount: 1000 },
                  { name: 'WEBSITE/E-RESULT', amount: 1000 },
                  { name: 'RRR', amount: 400 }
              ];
          } else {
              // Standard for JSS1, JSS2, SS1, SS2, ST1, ST2
              items = [
                  { name: 'SKOOL MEDIA', amount: 3000 },
                  { name: 'EXTRA LESSON', amount: 2000 },
                  { name: 'ICT TRAINING', amount: 2000 },
                  { name: 'MEDICAL', amount: 2000 },
                  { name: 'UTILITIES', amount: 2000 },
                  { name: 'CLUBS AND SOCIETIES', amount: 1000 },
                  { name: 'SECURITY', amount: 1000 },
                  { name: 'SPORTS', amount: 1000 },
                  { name: 'STATIONERY', amount: 1000 },
                  { name: 'VOCATIONAL', amount: 1000 },
                  { name: 'WEBSITE/E-RESULT', amount: 1000 },
                  { name: 'RRR', amount: 400 }
              ];
          }

          // If boarder, push boarding fees to the top
          if (studentType === 'boarder') {
              items.unshift({ name: 'BOARDING FEES', amount: 30000 });
          }

          return items;
      }

      function buildInvoiceHTML(data) {
          const logoUrl = "https://platformeduportal.com/resources/clients/uploads/logo/0357143669.jpg";
          const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + data.rrr;
          
          // Determine Header based on isPTA flag
          const schoolNameHeader = data.isPTA ? "PTA FEDERAL TECHNICAL COLLEGE, AWKA" : "FEDERAL TECHNICAL COLLEGE, AWKA";

          // An exact vector replica of the avatar from the PDF screenshot
          let rawAvatarSvg = '';

          if (data.gender === 'FEMALE') {
              // FEMALE AVATAR (Longer hair, blouse, no tie)
              rawAvatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50" fill="#f07c38"/>
                  <path d="M20 100 c0-35 15-35 30-35 s30 0 30 35 z" fill="#d1d5d8"/>
                  <rect x="42" y="45" width="16" height="25" fill="#dca380"/>
                  <path d="M42 60 q8 8 16 0 v8 h-16 z" fill="#c38d6b"/>
                  <circle cx="28" cy="45" r="5" fill="#dca380"/>
                  <circle cx="72" cy="45" r="5" fill="#dca380"/>
                  <path d="M25 60 q-5-40 25-45 q30 5 25 45 q-5 10-10 0 q-15 20-30 0 q-5 10-10 0 z" fill="#361f13"/>
                  <path d="M30 40 c0 20 5 28 20 28 s20-8 20-28 s-5-20-20-20 s-20 0-20 20 z" fill="#f4bf9a"/>
                  <path d="M26 35 q 0-20 20-25 t 25 15 q-15-10-30 0 q-10 5-15 10 z" fill="#361f13"/>
              </svg>`;
          } else {
              // MALE AVATAR (Exact replica from the PDF: spiky hair, suit, tie)
              rawAvatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50" fill="#f07c38"/>
                  <path d="M15 100 c0-35 15-40 35-40 s35 5 35 40 z" fill="#d1d5d8"/>
                  <path d="M46 65 l8 0 l-3 35 l-2 0 z" fill="#3a4045"/>
                  <polygon points="46,65 54,65 50,73" fill="#2b3035"/>
                  <polygon points="25,55 50,80 45,65" fill="#ffffff"/>
                  <polygon points="75,55 50,80 55,65" fill="#ffffff"/>
                  <rect x="42" y="45" width="16" height="25" fill="#dca380"/>
                  <path d="M42 62 q8 8 16 0 v8 h-16 z" fill="#c38d6b"/>
                  <circle cx="28" cy="45" r="5" fill="#dca380"/>
                  <circle cx="72" cy="45" r="5" fill="#dca380"/>
                  <path d="M30 40 c0 20 5 28 20 28 s20-8 20-28 s-5-20-20-20 s-20 0-20 20 z" fill="#f4bf9a"/>
                  <path d="M26 35 q 0-20 20-25 t 25 15 q 5-10 -10-15 q 20 5 0 25 q 10-10 -10-5 q -15 10 -25 5 z" fill="#361f13"/>
                  <path d="M30 25 l 6-8 l 4 6 l 7-10 l 5 8 l 8-8 l 2 12 q -15-8 -32 0 z" fill="#361f13"/>
              </svg>`;
          }

          // Encode properly so quotes don't break HTML
          const avatarSvg = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(rawAvatarSvg);

          let rowsHtml = '';
          data.items.forEach((item, index) => {
              rowsHtml += `
                  <tr>
                      <td class="num-col">${index + 1}</td>
                      <td>${item.name}</td>
                      <td class="amount-col">${item.amount.toLocaleString()}</td>
                  </tr>
              `;
          });

          return `
              <div class="generated-invoice">
                  <img src="${logoUrl}" class="invoice-watermark" alt="Watermark">
                  
                  <div class="invoice-content">
                      <div class="invoice-top-header">
                          <img src="${logoUrl}" width="70" alt="Logo">
                          <h2>${schoolNameHeader}</h2>
                      </div>
                      
                      <div class="invoice-subtitle">
                          BILL INVOICE - ${data.classGrp} ${data.term.toUpperCase()} 2025/2026
                      </div>
                      
                      <div class="invoice-details-box">
                          <div class="invoice-details-left">
                              <span class="invoice-name">${data.fullName}</span>
                              <div class="invoice-text-row">
                                  USERNAME: ${data.username}<br>
                                  GENDER: ${data.gender}<br>
                                  EMAIL: ${data.email}<br>
                                  PHONE: ${data.phone}
                              </div>
                          </div>
                          <div class="invoice-details-middle">
                              <div class="invoice-text-row">
                                  CURRENT CLASS: <strong>${data.className}</strong><br>
                                  HOUSE:<br>
                                  RESIDENCE: ${data.residence}
                              </div>
                          </div>
                          <div class="invoice-details-right">
                              <img src="${avatarSvg}" alt="Student Avatar">
                          </div>
                      </div>

                      <div class="invoice-rrr-section">
                          <img src="${qrUrl}" width="80" alt="QR Code">
                          <div class="invoice-rrr-text">
                              RRR: ${data.rrr} <span style="color: #d9534f;">UNPAID</span>
                          </div>
                      </div>

                      <table class="invoice-table">
                          <thead>
                              <tr>
                                  <th class="num-col">#</th>
                                  <th>FEES</th>
                                  <th class="amount-col">AMOUNT (NGN)</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${rowsHtml}
                              <tr>
                                  <td colspan="2" style="font-weight: bold;">TOTAL</td>
                                  <td class="amount-col" style="font-weight: bold;">${data.totalFormatted}</td>
                              </tr>
                          </tbody>
                      </table>
                      
                      <div class="invoice-footer">
                          <div>
                              Generated at ${data.dateStr}
                          </div>
                          <img src="pics/arms.png" alt="Coat of Arms" width="40">
                      </div>
                  </div>
              </div>
          `;
      }

      function handlePaymentSubmit(e) {
        e.preventDefault();

        let fullNameInput = document.getElementById("fullName");
        let fullName = fullNameInput.value.trim().toUpperCase();
        fullNameInput.value = fullName;

        const nameWords = fullName.split(/\s+/);
        if (nameWords.length !== 3) {
          alert("Full Name must contain exactly three names (First Middle Last).");
          fullNameInput.focus();
          return;
        }

        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        const schoolFeesActive = document.getElementById('sec_school_fees').classList.contains('active');
        const ptaActive = document.getElementById('sec_pta').classList.contains('active');

        // RRR validation
        let rrrValue = "";
        if (schoolFeesActive) {
            rrrValue = document.getElementById("rrr").value;
        } else if (ptaActive) {
            const rrrInput = document.querySelector('#sec_pta input[placeholder="xxxxxxxxxxxx"]');
            rrrValue = rrrInput ? rrrInput.value : '';
        }
        if (rrrValue.length !== 12) {
            alert("RRR must be exactly 12 characters.");
            if (schoolFeesActive) {
                document.getElementById("rrr").focus();
            } else if (ptaActive) {
                const rrrInput = document.querySelector('#sec_pta input[placeholder="xxxxxxxxxxxx"]');
                if (rrrInput) rrrInput.focus();
            }
            return;
        }

        if (schoolFeesActive) {
            let rawAmount = document.getElementById("amount").value;
            const amount = parseFloat(rawAmount.replace(/[^0-9.]/g, ''));

            if (isNaN(amount) || amount <= 0) {
              alert("Please ensure a valid amount is displayed before paying.");
              return;
            }

            const activeSection = document.querySelector('.dynamic-section.active');
            const classSelect = activeSection.querySelector('select[id*="class"]');
            const studentTypeSelect = document.getElementById("studentType");
            const genderSelect = document.getElementById("gender");
            const termSelect = document.getElementById("sf_term");

            if (!classSelect || classSelect.value === "") { alert("Please select a valid Class."); return; }
            if (!studentTypeSelect || studentTypeSelect.value === "") { alert("Please select Student Type."); return; }
            if (!genderSelect || genderSelect.value === "") { alert("Please select Gender."); return; }
            if (!termSelect || termSelect.value === "") { alert("Please select Term."); return; }

            currentPaymentPayload = {
                email: email,
                amount: amount,
                fullName: fullName
            };

            const classGrp = getClassGroup(classSelect.value); 
            const studentType = studentTypeSelect.value;       

            let d = new Date();
            let dateStr = d.getFullYear() + "-" + 
                          String(d.getMonth() + 1).padStart(2, '0') + "-" + 
                          String(d.getDate()).padStart(2, '0') + " " + 
                          String(d.getHours()).padStart(2, '0') + ":" + 
                          String(d.getMinutes()).padStart(2, '0') + ":" + 
                          String(d.getSeconds()).padStart(2, '0');

            const invoiceData = {
                fullName: fullName,
                email: email,
                phone: phone,
                gender: genderSelect.options[genderSelect.selectedIndex].text.toUpperCase(),
                className: classSelect.options[classSelect.selectedIndex].text,
                classGrp: classGrp,
                term: termSelect.value,
                residence: studentType === 'boarder' ? 'Boarder' : 'Day Student',
                username: 'FSTCAW' + Math.floor(10000000 + Math.random() * 90000000).toString(),
                rrr: rrrValue,
                items: getFeeItems(classGrp, studentType),
                totalFormatted: amount.toLocaleString(),
                dateStr: dateStr,
                isPTA: false
            };

            window.invoiceData = invoiceData;
            const htmlContent = buildInvoiceHTML(invoiceData);
            document.getElementById('invoiceContainer').innerHTML = htmlContent;
            document.getElementById('pdfModalOverlay').style.display = 'flex';
            document.getElementById('modalBodyScroll').scrollTop = 0;

        } else if (ptaActive) {
            let rawAmount = document.getElementById("pta_amount").value;
            const amount = parseFloat(rawAmount.replace(/[^0-9.]/g, ''));

            if (isNaN(amount) || amount <= 0) {
              alert("Please ensure a valid amount is displayed before paying.");
              return;
            }

            const classSelect = document.getElementById("pta_class");
            const studentTypeSelect = document.getElementById("pta_studentType");
            const genderSelect = document.getElementById("pta_gender");
            const termSelect = document.getElementById("pta_term");

            if (!classSelect || classSelect.value === "") { alert("Please select a valid Class."); return; }
            if (!studentTypeSelect || studentTypeSelect.value === "") { alert("Please select Student Type."); return; }
            if (!genderSelect || genderSelect.value === "") { alert("Please select Gender."); return; }
            if (!termSelect || termSelect.value === "") { alert("Please select Term."); return; }

            currentPaymentPayload = {
                email: email,
                amount: amount,
                fullName: fullName
            };

            const classGrp = getClassGroup(classSelect.value); 
            const studentType = studentTypeSelect.value;       

            let d = new Date();
            let dateStr = d.getFullYear() + "-" + 
                          String(d.getMonth() + 1).padStart(2, '0') + "-" + 
                          String(d.getDate()).padStart(2, '0') + " " + 
                          String(d.getHours()).padStart(2, '0') + ":" + 
                          String(d.getMinutes()).padStart(2, '0') + ":" + 
                          String(d.getSeconds()).padStart(2, '0');

            const invoiceData = {
                fullName: fullName,
                email: email,
                phone: phone,
                gender: genderSelect.options[genderSelect.selectedIndex].text.toUpperCase(),
                className: classSelect.options[classSelect.selectedIndex].text,
                classGrp: classGrp,
                term: termSelect.value,
                residence: studentType === 'boarder' ? 'Boarder' : 'Day Student',
                username: 'FSTCAW' + Math.floor(10000000 + Math.random() * 90000000).toString(),
                rrr: rrrValue,
                items: [{ name: 'PTA LEVY', amount: amount }],
                totalFormatted: amount.toLocaleString(),
                dateStr: dateStr,
                isPTA: true
            };

            window.invoiceData = invoiceData;
            const htmlContent = buildInvoiceHTML(invoiceData);
            document.getElementById('invoiceContainer').innerHTML = htmlContent;
            document.getElementById('pdfModalOverlay').style.display = 'flex';
            document.getElementById('modalBodyScroll').scrollTop = 0;
        }
      }

      document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
          closePdfModal();
          launchPaystack();
      });

      function launchPaystack() {
                let handler = PaystackPop.setup({
                    key: 'pk_test_233ae251c7cdfbfabe22ef9ffdcef9397d7de765', 
                    email: currentPaymentPayload.email,
                    amount: currentPaymentPayload.amount * 100, 
                    currency: 'NGN',
                    ref: 'FSTC_' + Math.floor((Math.random() * 1000000000) + 1),
                    metadata: {
                        custom_fields:[
                            {
                                display_name: "Full Name",
                                variable_name: "full_name",
                                value: currentPaymentPayload.fullName
                            }
                        ]
                    },
                    callback: function(response) {
                        alert('Payment successful! Transaction Reference: ' + response.reference);
                        if (window.invoiceData) {
                            localStorage.setItem('fstc_invoice', JSON.stringify(window.invoiceData));
                        }
                        window.location.href = 'receipt.html';
                    },
                    onClose: function() {
                        alert('Payment window closed. Payment was not completed.');
                    }
                });

                handler.openIframe();
            }