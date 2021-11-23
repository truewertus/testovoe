<?php
$mysqli = new mysqli('localhost','root', '', 'workers');
if($_GET['do'] == 'sub'){
    $query = "SELECT * FROM `sub` WHERE `deleted` = '0' ORDER BY `id`;";
    echo json_encode($mysqli->query($query)->fetch_all(1));
}

if($_GET['do'] == 'delsub'){
    $id = intval($_GET['id']);
    $query = "UPDATE `sub` SET `deleted` = '1' WHERE `id` = '{$id}';";
    $mysqli->query($query);
    echo json_encode(['status' => 'ok']);
}

if($_GET['do'] == 'delworker'){
    $id = intval($_GET['id']);
    $query = "UPDATE `workers` SET `deleted` = '1' WHERE `id` = '{$id}';";
    $mysqli->query($query);
    echo json_encode(['status' => 'ok']);
}

if($_GET['do'] == 'newsub'){
    $name = $mysqli->escape_string($_GET['name']);
    $name = strip_tags($name);
    $query = "INSERT INTO `sub` VALUES (null, '0', '{$name}');";
    if($mysqli->query($query))
        echo json_encode(['status' => 'ok']);
    else
        echo json_encode(['status' => 'nope']);
}

if($_GET['do'] == 'show'){
    $sub = intval($_GET['sub']);
    if($sub == 0){
        $query = "SELECT * FROM `workers` WHERE `deleted` = '0';";
    }else{
        $query = "SELECT * FROM `workers` WHERE `deleted` = '0' AND `subid` = '{$sub}';";
    }
    echo json_encode($mysqli->query($query)->fetch_all(1));
}

if($_GET['do'] == 'newWorker'){
    $surname = $mysqli->escape_string($_GET['surname']);
    $name = $mysqli->escape_string($_GET['name']);
    $secondname = $mysqli->escape_string($_GET['secondname']);
    $bdate = $mysqli->escape_string($_GET['bdate']);
    $pol = $mysqli->escape_string($_GET['pol']);
    $sub = intval($_GET['sub']);
    $id = intval($_GET['id']);
    if($id > 0){
        $query = "UPDATE `workers` SET `surname` = '{$surname}', `name` = '{$name}', `secondname` = '{$secondname}', `bdate` = '{$bdate}', `pol` = '{$pol}' WHERE `id` = '{$id}';";
    }else{
        $query = "INSERT INTO `workers` VALUES (null, '{$surname}', '{$name}', '{$secondname}', '{$bdate}','{$sub}','0', '{$pol}')";
    }
    $mysqli->query($query);
    echo json_encode(["status" => "ok"]);
}

