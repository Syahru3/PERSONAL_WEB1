 function sendEmail(event) {
        event.preventDefault();
      
        const inputName = document.getElementById("inputname").value;
        const inputEmail = document.getElementById("inputemail").value;
        const inputPhoneNumber = document.getElementById("inputnumber").value;
        const inputSubject = document.getElementById("subject").value;
        const inputMessage = document.getElementById("message").value;

        if (!inputName.length) {
            return alert(`Nama tidak boleh kosong!`);
          } else if (!inputEmail.length) {
            return alert(`Email tidak boleh kosong!`);
          } else if (!inputPhoneNumber.length) {
            return alert(`Phone Number tidak boleh kosong!`);
          } else if (!inputSubject.length) {
            return alert(`Subject tidak boleh kosong!`);
          } else if (!inputMessage.length) {
            return alert(`Message tidak boleh kosong!`);
          }

        alert(
        `Name: ${inputName}\nEmail: ${inputEmail}\nPhone Number: ${inputPhoneNumber}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`
        );

        const link = document.createElement("a");
        link.href = `mailto:${inputEmail}?subject=${inputSubject}&body=Nama: ${inputName}%0D%0ANomor HP: ${inputPhoneNumber}%0D%0AMessage: ${inputMessage}`;
        
        link.click();

        const contact = {
          name: inputName,
          email: inputEmail,
          phoneNumber: inputPhoneNumber,
          sebject: inputSubject,
          message: inputMessage,
        };

        console.log(contact);
        
        // Reset form setelah alert (opsional)
        document.getElementById('myForm').reset();
    }