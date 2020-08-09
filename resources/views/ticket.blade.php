<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css" media="all">
        body {background: none white;  content: "©"; padding: 0;}
        .row{ margin: 0;  padding: 0; width: 100%; position: relative; font-size: 12px;}
        .clear { clear: both;}
        .title{ text-transform: uppercase; }
        .title_pie{ text-transform: uppercase; font-size: 10px; }
        h5 {
            margin: 0;
            padding:5px 5px 5px 5px;
        }
        .txt-center {
            text-align: center;
        }
        .border {
            border-top: 5px dotted black;
            border-bottom: 5px dotted black;
        }
        .separator{ width: 100%; height: 15px; }
        .ticket_list{ border-top: 1px dashed black; padding: 10px 0 10px 0; }
        .totals div{width: 100%;}

        .btn{
            background-color: rgba(255,255,255,1);
            background-color: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255,255,255,1)), color-stop(47%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)));
            background-color: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=1 );
            padding: 5px 12px 5px 12px;
            border: 1px solid #777777;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.16);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .btn:hover{
            background-color: rgb(254, 255, 231);
            background-color: -moz-radial-gradient(center, ellipse cover, rgb(254, 255, 231) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgb(254, 255, 231)), color-stop(47%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)));
            background-color: -webkit-radial-gradient(center, ellipse cover, rgb(254, 255, 231) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background-color: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=1 );
            box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.36);
        }
        .btn:after {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 120px;
            height: 120px;
            margin-left: -60px;
            margin-top: -60px;
            background: #1a24b5;
            border-radius: 100%;
            opacity: .6;
            transform: scale(0);
        }
        @keyframes ripple {
            0% {
                transform: scale(0);
            }
            20% {
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(1);
            }
        }
        .btn:not(:active):after {
            animation: ripple 1s ease-out;
        }
        .btn:after {
            visibility: hidden;
        }
        .btn:focus:after {
            visibility: visible;
        }

    </style>
    <style type="text/css" media="screen">
        body{width: 100% !important;}
        .ticket{margin: 0 15px;}
    </style>
    <style type="text/css" media="print">
        .print-button{display: none;}
    </style>
</head>
<body style="width: 4.2in !important;">
<div class="ticket">
    <!-- EMPRESA -->
    <div class="txt-center">
        <div class="row">
            <img src="{{asset('back/logo.jpg')}}"  width="240px" alt="">
        </div>
        <div class="row">
            <h5>DIRECCION</h5>
        </div>
        <div class="row">
            <h5>Tel: 3464645</h5>
        </div>
        <div class="row">
            <h5> RFC: 3464576547</h5>
        </div>
    </div>

    <div class="separator"></div>
    <div class="row txt-center">
        <h5>Nota de venta</h5>
    </div>
    <div class="separator"></div>
    <div class="clear"></div>
    <div class="ticket_list">
        <div class="row">
            <div style="width: 40%; float: left">
                <b>Analisis</b>
            </div>
            <div  style="width: 20%; text-align: center; float: left">
                <b>Cantidad</b>
            </div>
            <div  style="width: 20%;float: left">
                <b>Precio</b>
            </div>

            <div  style="width: 20%;float:left; text-align: right">
                <b>Importe</b>
            </div>
        </div>
        <div class="clear"></div>
        @foreach($data->analysis as $item)
            <div class="row" style="margin-top: 5px">
                <div  style="width:40%; float:left; font-size: 10px;">
                    {{$item->analysis->description}}
                </div>
                <div style="width:20%; float: left; text-align: center; font-size: 10px;">
                    1
                </div>
                <div style="width:20%; float: left; font-size: 10px;">
                    {{$item->price}}
                </div>
                <div style="width: 20%; float:left; text-align: right;font-size: 10px;">
                    {{$item->price}}
                </div>
            </div>
        @endforeach
    </div>
    <div class="clear"></div>
    <div class="separator"></div>
    <div class="row" style="border-top: 1px dashed black; border-bottom: 1px dashed black; padding: 10px  0 10px 0">
        <div class="row ">
            <span style="margin-right: 15px">TOTAL IVA INC</span> :
        </div>
        <div class="row ">
            <span style="margin-right: 22px">BASE IMP IVA </span> :
        </div>
        <div class="row ">
            <span style="margin-right:53px">IVA 21%</span> :
        </div>
        <div class="row">
            <span style="margin-right: 53px">Recivido</span> :
        </div>
        <div class="row">
            <span style="margin-right: 57px">Cambio</span> :
        </div>
    </div>
</div>
<div class="print-button">
    <p>El ticket se ha creado correctamente, puede imprimirlo presionando el bot&oacute;n de imprimir</p>
    <button class="btn btn-primary"  onclick="javascript:print()"><i class="fa fa-print"></i>Imprimir</button>
</div>
<script type="text/javascript">
  //  window.print();
</script>
</body>
</html>