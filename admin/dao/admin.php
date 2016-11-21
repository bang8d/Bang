<?php
if(isset($_POST['type'])){
    $type = $_POST['type'];
    echo $type;
} else {
    echo 'chose';
}