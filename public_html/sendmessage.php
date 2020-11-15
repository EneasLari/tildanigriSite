<?php
$sendto   = "info@to-en.gr";
$name = $_POST['name'];
$subject = $_POST['subject'];
$usermail = $_POST['email'];
$content  = nl2br($_POST['msg']);

$subject  = strip_tags($subject);
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

$message  = "<html><body style='font-family:Arial,sans-serif;'>";
//$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>". strip_tags($msgtitle) ."</h2>\r\n";
//$msg .= "<p><strong>Sent by:</strong> ".$usermail."</p>\r\n";
$message .= "<p><strong>Name:</strong>".$name."</p>\r\n";
$message .= "<p><strong>Message:</strong> ".$content."</p>\r\n";
$message .= "</body></html>";


if(@mail($sendto, $subject, $message, $headers)) {
	echo "true";
} else {
	echo "false";
}

?>