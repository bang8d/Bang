<?php 
include 'inc/head.php';
include '../dao/admin.php';
$pageActuellle = $_GET['p'];
$utilisateur = $_SESSION['utilisateur'];
if ($pageActuellle == '' || $pageActuellle = 'acceuil' && !isset($utilisateur)){
     include 'inc/accueil.php';
 } else {

 }
 ?>