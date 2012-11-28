require.config({
  shim: {
  },

  paths: {
    jquery: 'vendor/jquery.min'
  }
});

require(['colors'], function(colors) {
    var $element = $('.user');

    function hexFromRGB(r, g, b) {
        var hex = [
            r.toString( 16 ),
            g.toString( 16 ),
            b.toString( 16 )
        ];
        $.each( hex, function( nr, val ) {
            if ( val.length === 1 ) {
                hex[ nr ] = "0" + val;
            }
        });
        return hex.join( "" ).toUpperCase();
    }

    function updateFgColor() {
        var color = $( "#fg" ).slider( "value" );
        $element.css( "color", colors[color] ).data('fgcolor', color);
        console.log(color);
    }

    function updateBgColor() {
        var color = $( "#bg" ).slider( "value" );
        $element.css( "background-color", colors[color] ).data('bgcolor', color);
        console.log(color);
    }


    function refreshBold(){
        if($(this).val() === '1')
        {
            $element.css('font-weight','bold');
        }
        else
        {
            $element.css('font-weight','normal');
        }
    }

    $(function() {
        $( "#fg" ).slider({
            orientation: "horizontal",
            range: "min",
            max: 15,
            min: 0,
            slide: updateFgColor,
            change: updateFgColor
        });

        $( "#bg" ).slider({
            orientation: "horizontal",
            range: "min",
            max: 15,
            min: 0,
            slide: updateBgColor,
            change: updateBgColor
        });

        $( "#weight" ).find('input').click(refreshBold).end().buttonset();

        $( '#prompt > span, #terminal' ).click(function(e){
            var currFgColor = 15, currBgColor = 0;

            $element = $(e.target);

            currFgColor = $element.data('fgcolor') || currFgColor;
            currBgColor = $element.data('bgcolor') || currBgColor;

            $( "#fg" ).slider( "value", currFgColor );
            $( "#bg" ).slider( "value", currBgColor );
        });
    });
});
