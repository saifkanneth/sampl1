var alivenow=alivenow||{};

alivenow.SERVER=(function(){
    
        function SERVER(){
            
        };
    SERVER.prototype.send=function(_url,_success,_error,_data,_type,_dataType){
        
        
        var t =new Date().getTime();
        if(_data!=null){
            _data.t=t;
                var dAr = CryptoJS.enc.Utf8.parse(JSON.stringify(_data));

                    var dr = CryptoJS.enc.Base64.stringify(dAr);

                    

                    var hd= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));

                    

                    var shaObj = new jsSHA("SHA-256", "TEXT");

                    shaObj.setHMACKey(alivenow.Global.gameKey, "TEXT");

                    shaObj.update(hd + "." + dr);

                    var hmac = shaObj.getHMAC("HEX");

                    var k1 = CryptoJS.enc.Utf8.parse(hmac);

                    var k2= CryptoJS.enc.Base64.stringify(k1);

                    

                    var text = "";

                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    var r1 = Math.floor(Math.random() * 6)+1;

                    var r2 = Math.floor(Math.random() * 7)+2;

                    for( var i=0; i < r2; i++ )

                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    

                    var f_str=String(r2)+String(r1)+k2.substr(0,r1)+text+k2.substr(r1);

                    var out = hd+"."+dr+"."+f_str;
        var fullObj={data:out,uid:alivenow.Global.U_ID}
        }else{
            fullObj={};
        }
                
        _type=_type==undefined?"POST":_type;
        _dataType=_dataType==undefined?null:_dataType;
        $.ajax({
            url:_url,
            datatype:_dataType,
            type: _type,
            data:fullObj,
            success:_success,
            error:_error
        });
    };
    return SERVER;
})();