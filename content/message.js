 function clicked() {
        var response = prompt('E.Signature', "Full Name");
        if (confirm("Press Confirm!")) {
            response = alert(`Success Message! Dear ${response}, Your form is successsfully submiited at  ${Date()}. Please, give me a feedback on my Portfolio. Don't forget to change your screen size to see the website responsiveness!`)
        } else {
            response = alert(`Dear ${response} I am sorry that your submission is not Successfull!`);
        }
        }