function validateForm() {
            var name = document.forms["myForm"]["name"].value;
            var email = document.forms["myForm"]["email"].value;
            var password = document.forms["myForm"]["password"].value;
            var confirmPassword = document.forms["myForm"]["confirmPassword"].value;
            var phone = document.forms["myForm"]["phone"].value;

            if (name == "") {
                alert("Name must not be empty");
                return false;
            }

            if (email == "") {
                alert("Email must not be empty");
                return false;
            }

            var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                alert("Enter a valid email address");
                return false;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters");
                return false;
            }

            if (password != confirmPassword) {
                alert("Passwords do not match");
                return false;
            }

            if (phone.length != 10 || isNaN(phone)) {
                alert("Enter a valid 10-digit phone number");
                return false;
            }

            alert("Form submitted successfully");
            return true;
        }