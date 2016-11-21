<?php
/**
 * Créer avec PhpStorm.
 * Auteur: mmont
 * Date: 21/11/2016
 * Heure: 13:24
 */
include 'vue/head.php';
$pageActuellle = $_GET['p'];
$utilisateur = $_SESSION['utilisateur'];
if ($pageActuellle == ''){
    include 'vue/accueil.php';
} else if($pageActuellle == 'admin') {
    include 'vue/admin.php';
} else if($pageActuellle == 'adminDetail'){
    include 'vue/admindetail.php';
} else if($pageActuellle == 'crudVideo'){
    include 'vue/crudvideo.php';
}