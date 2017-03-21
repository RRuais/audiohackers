$(document).ready(function() {

    $('.button-wrap').on("click", function() {
        $(this).toggleClass('button-active');
    });
    //Jquery UI Functions
    $(".ui-button").button({});

    $("#menu").menu();

    //10 sine wave oscillator button clicks
    $('#osc1').on("click", function() {
        oscOnOff(1);
    });

    $('#osc2').on("click", function() {
        oscOnOff(2);
    });

    $('#osc3').on("click", function() {
        oscOnOff(3);
    });

    $('#osc4').on("click", function() {
        oscOnOff(4);
    });

    $('#osc5').on("click", function() {
        oscOnOff(5);
    });

    $('#osc6').on("click", function() {
        oscOnOff(6);
    });

    $('#osc7').on("click", function() {
        oscOnOff(7);
    });

    $('#osc8').on("click", function() {
        oscOnOff(8);
    });

    $('#osc9').on("click", function() {
        oscOnOff(9);
    });

    $('#osc10').on("click", function() {
        oscOnOff(10);
    });

    $('#fillSqaureValues').on('click', function() {
        fillSqaureValues();
    });

    $('#fillSawValues').on('click', function() {
        fillSawValues();
    });

    $('#fillTriangleValues').on('click', function() {
        fillTriangleValues();
    });

    $('#oscSquare').on("click", function() {
        oscSquare();
    });

    $('#oscSaw').on("click", function() {
        oscSaw();
    });

    $('#oscTri').on("click", function() {
        oscTri();
    });

    $('#allOff').on("click", function() {
        allOnOffSwap();
    });

    $('#resetAll').on("click", function() {

        resetAll();
    });

    $('#oscOctaveOnOff').on("click", function() {
        oscOctaveOnOff();
    });



    function fillSqaureValues() {
        if ($('#osc1Freq').val() && $('#osc1VolInput').val()) {
            let val1 = $('#osc1Freq').val();
            $('#osc2Freq').val(val1 * 3);
            $('#osc3Freq').val(val1 * 5);
            $('#osc4Freq').val(val1 * 7);
            $('#osc5Freq').val(val1 * 9);
            $('#osc6Freq').val(val1 * 11);
            $('#osc7Freq').val(val1 * 13);
            $('#osc8Freq').val(val1 * 15);
            $('#osc9Freq').val(val1 * 17);
            $('#osc10Freq').val(val1 * 19);
            let vol1 = $('#osc1VolInput').val();
            $('#osc2VolInput').val(round(vol1 / 3));
            $('#osc3VolInput').val(round(vol1 / 5));
            $('#osc4VolInput').val(round(vol1 / 7));
            $('#osc5VolInput').val(round(vol1 / 9));
            $('#osc6VolInput').val(round(vol1 / 11));
            $('#osc7VolInput').val(round(vol1 / 13));
            $('#osc8VolInput').val(round(vol1 / 15));
            $('#osc9VolInput').val(round(vol1 / 17));
            $('#osc10VolInput').val(round(vol1 / 19));
        };
    };

    function fillSawValues() {
        if ($('#osc1Freq').val() && $('#osc1VolInput').val()) {
            let val1 = $('#osc1Freq').val();
            $('#osc2Freq').val(val1 * 2);
            $('#osc3Freq').val(val1 * 3);
            $('#osc4Freq').val(val1 * 4);
            $('#osc5Freq').val(val1 * 5);
            $('#osc6Freq').val(val1 * 6);
            $('#osc7Freq').val(val1 * 7);
            $('#osc8Freq').val(val1 * 8);
            $('#osc9Freq').val(val1 * 9);
            $('#osc10Freq').val(val1 * 10);
            let vol1 = $('#osc1VolInput').val();
            $('#osc2VolInput').val(round(vol1 / 2));
            $('#osc3VolInput').val(round(vol1 / 3));
            $('#osc4VolInput').val(round(vol1 / 4));
            $('#osc5VolInput').val(round(vol1 / 5));
            $('#osc6VolInput').val(round(vol1 / 6));
            $('#osc7VolInput').val(round(vol1 / 7));
            $('#osc8VolInput').val(round(vol1 / 8));
            $('#osc9VolInput').val(round(vol1 / 9));
            $('#osc10VolInput').val(round(vol1 / 10));
        };
    };

    function round(value) {
        return Math.round(100000 * value) / 100000
    };

    function fillTriangleValues() {
        if ($('#osc1Freq').val() && $('#osc1VolInput').val()) {
            let val1 = $('#osc1Freq').val();
            $('#osc2Freq').val(val1 * 3);
            $('#osc3Freq').val(val1 * 5);
            $('#osc4Freq').val(val1 * 7);
            $('#osc5Freq').val(val1 * 9);
            $('#osc6Freq').val(val1 * 11);
            $('#osc7Freq').val(val1 * 13);
            $('#osc8Freq').val(val1 * 15);
            $('#osc9Freq').val(val1 * 17);
            $('#osc10Freq').val(val1 * 19);
            let vol1 = $('#osc1VolInput').val();
            $('#osc2VolInput').val(squareMath(vol1 / 3));
            $('#osc3VolInput').val(squareMath(vol1 / 5));
            $('#osc4VolInput').val(squareMath(vol1 / 7));
            $('#osc5VolInput').val(squareMath(vol1 / 9));
            $('#osc6VolInput').val(squareMath(vol1 / 11));
            $('#osc7VolInput').val(squareMath(vol1 / 13));
            $('#osc8VolInput').val(squareMath(vol1 / 15));
            $('#osc9VolInput').val(squareMath(vol1 / 17));
            $('#osc10VolInput').val(squareMath(vol1 / 19));
        };
    };

    function squareMath(value) {
        return value * value;
    };


    //Main Audio Context
    var context = new window.AudioContext();

    //Master Gain
    var masterGain = context.createGain();
    masterGain.gain.value = 0.0;
    $(function() {
        $("#masterVolumeSlider").slider({
            orientation: "horizontal",
            min: 0.0,
            max: 0.9,
            step: 0.025,
            range: 'min',
            value: 0,
            slide: function(event, ui) {
                var masterGainVolume = (ui.value);
                masterGain.gain.value = masterGainVolume;
            }
        });
    });



    //////////////////// Oscillators ////////////////////

    //Oscillator Constructor
    var Oscillator = function(frequency, amplitude) {
        //Oscillator Setup
        this.isPlaying = false;
        this.oscillator = context.createOscillator();
        this.oscillator.frequency.value = frequency;
        this.gain = context.createGain();
        this.gain.gain.value = amplitude;
        this.oscillator.connect(this.gain);
        this.oscillator.start();
        //Oscillator Methods
        this.playOscillator = function() {
            this.gain.connect(masterGain);
            this.isPlaying = true;

        };
        this.stopOscillator = function() {
            this.gain.disconnect(masterGain);
            this.isPlaying = false;
        };
    };

    //Sqaure Wave Osc
    var oscillatorSquare = new Oscillator(440, 0.5);
    oscillatorSquare.oscillator.type = 'square';
    let oscSquare = function() {
        if (oscillatorSquare.isPlaying === false) {
            oscillatorSquare.isPlaying = true
            oscillatorSquare.playOscillator();
            $('#oscSquare')[0].innerHTML = '<i class="fa fa-stop fa-lg"></i>&nbsp;&nbsp;Square';
        } else {
            oscillatorSquare.isPlaying = false;
            oscillatorSquare.stopOscillator();
            $('#oscSquare')[0].innerHTML = '<i class="fa fa-play fa-lg"></i>&nbsp;&nbsp;Square';

        };
    };

    //Sawtooth Wave Osc
    var oscillatorSaw = new Oscillator(440, 0.5);
    oscillatorSaw.oscillator.type = 'sawtooth';
    let oscSaw = function() {
        if (oscillatorSaw.isPlaying === false) {
            oscillatorSaw.isPlaying = true
            oscillatorSaw.playOscillator();
            $('#oscSaw')[0].innerHTML = '<i class="fa fa-stop fa-lg"></i>&nbsp;&nbsp;Sawtooth';
        } else {
            oscillatorSaw.isPlaying = false;
            oscillatorSaw.stopOscillator();
            $('#oscSaw')[0].innerHTML = '<i class="fa fa-play fa-lg"></i>&nbsp;&nbsp;Sawtooth';
        };
    };

    //Triangle Wave Osc
    var oscillatorTriangle = new Oscillator(440, 0.5);
    oscillatorTriangle.oscillator.type = 'triangle';
    let oscTri = function() {
        if (oscillatorTriangle.isPlaying === false) {
            oscillatorTriangle.isPlaying = true
            oscillatorTriangle.playOscillator();
            $('#oscTri')[0].innerHTML = '<i class="fa fa-stop fa-lg"></i>&nbsp;&nbsp;Triangle';
        } else {
            oscillatorTriangle.isPlaying = false;
            oscillatorTriangle.stopOscillator();
            $('#oscTri')[0].innerHTML = '<i class="fa fa-play fa-lg"></i>&nbsp;&nbsp;Triangle';
        };
    };

    //Create 10 Sine Wave Oscillators
    var oscillators = [];

    function createOscillators() {
        for (var i = 1; i <= 11; i++) {
            window['oscillator' + i] = new Oscillator(0, 0);
            oscillators.push(window['oscillator' + i])
        };
    };

    createOscillators();


    //Function for parsing Input values
    function connectViewMethods(count) {
        return {
            frequency: parseFloat($('#osc' + count + 'Freq').val()),
            amplitude: parseFloat($('#osc' + count + 'VolInput').val())
        };
    };

    //10 Sine Wave Oscillators On/Off Swap Function
    function oscOnOff(count) {
        if ($('#osc' + count + 'Freq').val() && $('#osc' + count + 'VolInput').val()) {
            if (oscillators[count].isPlaying === false) {
                oscillators[count].isPlaying = true;
                oscillators[count].oscillator.frequency.value = connectViewMethods(count).frequency;
                oscillators[count].gain.gain.value = connectViewMethods(count).amplitude;
                oscillators[count].playOscillator();
                $("#osc" + count).prop('checked', true);
            } else {
                oscillators[count].isPlaying = false;
                oscillators[count].stopOscillator();
                $("#osc" + count).prop('checked', false);
            };
        };
    };

    function allOnOffSwap() {
        for (var i = 0; i < oscillators.length; i++) {
            oscOnOff(i);
        };
    };

    //Reset all oscillators
    function resetAll() {
        for (var i = 0; i < oscillators.length; i++) {
            if (oscillators[i].isPlaying === true) {
                oscillators[i].isPlaying = false;
                oscillators[i].stopOscillator();
                $(":checkbox").prop('checked', false);
            }
            if (oscillatorsOctave[i].isPlaying === true) {
                oscillatorsOctave[i].isPlaying = false;
                oscillatorsOctave[i].stopOscillator();
                $('#oscOctaveOnOff').text('Turn On Octaves')
                $('#oscOctaveOnOff').css('color', 'white')
            }
        };
    };

    //Create 10 sine wave oscillators for octaves
    var oscillatorsOctave = [];

    function createOscillatorsOctave() {
        for (var i = 1; i <= 11; i++) {
            window['oscillatorOctave' + i] = new Oscillator(0, 0);
            oscillatorsOctave.push(window['oscillatorOctave' + i])
        };
    };

    createOscillatorsOctave();

    function oscOctave(count) {
        if ($('#osc' + count + 'Freq').val() && $('#osc' + count + 'VolInput').val()) {
            if (oscillatorsOctave[count].isPlaying === false) {
                oscillatorsOctave[count].isPlaying = true;
                oscillatorsOctave[count].oscillator.frequency.value = connectViewMethods(count).frequency + connectViewMethods(count).frequency;
                oscillatorsOctave[count].gain.gain.value = connectViewMethods(count).amplitude;
                oscillatorsOctave[count].playOscillator();
                $('#oscOctaveOnOff')[0].innerHTML = '<i class="fa fa-power-off fa-lg"></i>&nbsp;&nbsp;Octaves Off';
                $('#oscOctaveOnOff').css('color', 'red')

            } else {
                oscillatorsOctave[count].isPlaying = false;
                oscillatorsOctave[count].stopOscillator();
                $('#oscOctaveOnOff')[0].innerHTML = '<i class="fa fa-power-off fa-lg"></i>&nbsp;&nbsp;Octaves On';
                $('#oscOctaveOnOff').css('color', 'white')
            };
        };
    };

    function oscOctaveOnOff() {
        for (var i = 1; i < oscillatorsOctave.length; i++) {
            oscOctave(i);
        };
    };

    //////////////////// Audio Analyser ////////////////////

    var analyser = context.createAnalyser();
    masterGain.connect(analyser);
    analyser.connect(context.destination);

    var scopeCtx = document.getElementById('scope').getContext('2d');
    var spectCtx = document.getElementById('spectrum').getContext('2d');


    drawSpecCanvas();
    drawScopeCanvas();

    var fps_Spectrum = 60;

    function drawSpecCanvas() {
        setTimeout(function() {
            drawSpectrum(analyser, spectCtx);
            requestAnimationFrame(drawSpecCanvas);
        }, 1000 / fps_Spectrum );
    };

    var fps_Scope = 30;

    function drawScopeCanvas() {
        setTimeout(function() {
            drawScope(analyser, scopeCtx);
            requestAnimationFrame(drawScopeCanvas);
        }, 1000 / fps_Scope);
    };


    function drawSpectrum(analyser, ctx) {
        var WIDTH = ctx.canvas.width;
        var HEIGHT = ctx.canvas.height;
        var freqDomain = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(freqDomain);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < analyser.frequencyBinCount; i++) {
            var value = freqDomain[i];
            var percent = value / 256;
            var height = HEIGHT * percent;
            var offset = HEIGHT - height - 1;
            var barWidth = WIDTH / analyser.frequencyBinCount;
            var hue = i / analyser.frequencyBinCount * 360;
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            ctx.fillRect(i * barWidth, offset, barWidth, height);
        };
    };

    function drawScope(analyser, ctx) {

        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        analyser.getByteTimeDomainData(dataArray);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgb(9, 31, 38)';
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(110, 219, 255)';
        ctx.beginPath();
        var sliceWidth = width * 1.0 / bufferLength;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        ctx.lineTo(width, height / 2);
        ctx.stroke();

    };
});
//Out of Document Ready
