
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $question = $_POST['question'];

    // Save to database (optional)
  // You can save the form data to a database if you want to
  // This requires setting up a database connection and creating a table to store the data

  // Set the email subject and message
$subject = 'Contact Form Submission';
$message = "Name: Audrey Gesare\nEmail: gesareaudrey@gmail.com\nQuestion:\nWhat are the cities in Canada?";

// Set the recipient email address
$to = 'n.okoth@alustudent.com';

// Set the email headers
$headers = "From: gesareaudrey@gmail.com\r\n" .
           "Reply-To: gesareaudrey@gmail.com\r\n" .
           "X-Mailer: PHP/" . phpversion();


  // Send the email
  if (mail($to, $subject, $message, $headers)) {
    echo '<p>Thank you for your message. We will get back to you shortly.</p>';
  } else {
    echo '<p>Sorry, there was an error sending your message. Please try again later.</p>';
  }
}
?>
