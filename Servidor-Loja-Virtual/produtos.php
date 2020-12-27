<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if ($postjson['crud'] == "listar-produtos") {

    $data = array();

    $query = mysqli_query($mysqli, "SELECT * FROM produtos as c ORDER BY c.id desc LIMIT $postjson[start], $postjson[limit]");

    while ($row = mysqli_fetch_array($query)) {
        $data[] = array(
            'id'              => $row['id'],
            'codigo'          => $row['codigo'],
            'barra'           => $row['barra'],
            'nome'            => $row['nome'],
            'estoque'         => $row['estoque'],
            'qtd'             => $row['qtd'],
            'valor_compra'    => $row['valor_compra'],
            'valor_venda'     => $row['valor_venda'],
            'foto'            => $row['foto']

        );
    }

    if ($query) $result = json_encode(array('success' => true, 'result' => $data));
    else $result = json_encode(array('success' => false));
    echo $result;
} 


elseif ($postjson['crud'] == "insert-produtos") {
    $qtd = 1;
    $data = array();

    $radom     = date('Y-m-d_H_i_s');

    $entry     = base64_decode($postjson['foto']);

    $img       = imagecreatefromstring($entry);

    $directory = "./imgs/img_user" . $radom . ".jpg";

    imagejpeg($img, $directory);

    imagedestroy($img);

    $query   = mysqli_query($mysqli, "INSERT INTO produtos SET
                   codigo           = '$postjson[codigo]',
                   barra            = '$postjson[barra]',
                   nome             = '$postjson[nome]',
                   qtd              = '$qtd',
                   estoque          = '$postjson[estoque]',
                   valor_compra     = '$postjson[valor_compra]',
                   valor_venda      = '$postjson[valor_venda]',
                   foto             = '$directory'");

    $idadd = mysqli_insert_id($mysqli);

    if ($query) $result = json_encode(array('success' => true, 'idadd' => $idadd));
    else $result = json_encode(array('success' => false));
    echo $result;
} 



elseif($postjson['crud'] == "edit-produtos"){

    $data = array();

    $radom     = date('Y-m-d_H_i_s');

    $entry     = base64_decode($postjson['foto']);

    $img       = imagecreatefromstring($entry);

    $directory = "./imgs/img_user".$radom.".jpg";

    imagejpeg($img, $directory);

    imagedestroy($img);



    $query   = mysqli_query($mysqli, "UPDATE produtos SET
           
     
    codigo         =  '$postjson[codigo]',
    barra          =  '$postjson[barra]',
    nome           =  '$postjson[nome]',
    qtd            =  '$postjson[qtd]',
    estoque        =  '$postjson[estoque]',
    valor_compra   =  '$postjson[valor_compra]',
    valor_venda    =  '$postjson[valor_venda]',
    foto           =  '$directory' WHERE id  = '$postjson[id]'");


    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}

elseif($postjson['crud'] == "edit-produtos2"){

    $data = array();

    $query   = mysqli_query($mysqli, "UPDATE produtos SET
           
     
    codigo         =  '$postjson[codigo]',
    barra          =  '$postjson[barra]',
    nome           =  '$postjson[nome]',
    qtd            =  '$postjson[qtd]',
    estoque        =  '$postjson[estoque]',
    valor_compra   =  '$postjson[valor_compra]',
    valor_venda    =  '$postjson[valor_venda]',
    foto       =  '$postjson[foto]' WHERE id  = '$postjson[id]'");


    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}

elseif($postjson['crud'] == "atualizar-produtos"){

    $query2   = mysqli_query($mysqli, "UPDATE produtos SET
           
    estoque    =  '$postjson[estoque]'  WHERE id  = '$postjson[produtos_id]'");


    if($query2) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}

elseif($postjson['crud'] == "add-item"){
       
    $data = array();

    $query   = mysqli_query($mysqli, "INSERT INTO pedidos SET
               nome           = '$postjson[nome]',
               valor          = '$postjson[valor]',
               produtos_id    = '$postjson[produtos_id]',
               usuario_id     = '$postjson[usuario_id]',
               qtd            = '$postjson[qtd]' ");

    $idadd = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success' => true, 'idadd' => $idadd));
    else $result = json_encode(array('success'=> false));
    echo $result;
}


elseif($postjson['crud'] == "listar-produtos-atualizar"){

    $data = array();
    
    $query = mysqli_query($mysqli, "SELECT * FROM produtos WHERE id  = '$postjson[id]'");

    while($row = mysqli_fetch_array($query)){
        $data[] = array(
            'id'           => $row['id'],
            'estoque'      => $row['estoque']
            
        );
    }

    if($query) $result = json_encode(array('success' => true,'result' =>$data));
    else $result = json_encode(array('success'=> false));
    echo $result;

}

elseif ($postjson['crud'] == "deletar") {

    $query   = mysqli_query($mysqli, "DELETE FROM produtos WHERE id  = '$postjson[id]'");


    if ($query) $result = json_encode(array('success' => true));
    else $result = json_encode(array('success' => false, 'msg' => 'error, Por favor, tente novamente... '));
    echo $result;
}

