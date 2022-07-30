

function checkSpelling(){
    let typedWords = $('#spellcheck').val();
     $.ajax({
        url: "https://api.textgears.com/spelling",
        method: 'POST',
        data: {
            text: typedWords,
            language: "en-US",
            key:"6XsUeaTG1REph6Lc"
        
        },
        success: function(response){
            console.log(response.response);
            let getErrorWrods = response.response.errors;
            getbadCount = getErrorWrods.length;
            $('.error').html(getbadCount);
            spellCheckContent = $('#spellcheck').val().split(' '); 
            for(var i=0; i<getErrorWrods.length; i++){                              
                 let missspelled = getErrorWrods[i].bad;   
                 let missspelledIndex = spellCheckContent.indexOf(missspelled);
                 spellCheckContent[missspelledIndex] = `<span onmouseover="getBadWords('${missspelled}', ${missspelledIndex})" ><u style="color: red;">${missspelled}</u></span>`;               
                 $('#bindWords').html(spellCheckContent.join(' '));
            }
        }
    });

}

function getBadWords(badWords, indexval){
  

    $.ajax({
        url: "https://api.textgears.com/suggest",
        method: 'POST',
        data: {
            text: badWords,
            language: "en-US",
            key:"6XsUeaTG1REph6Lc"
        
        },
        success: function(response){
            let getsuggested = response.response.suggestions; 
            let corrected = response.response.corrected;            
            $('#listCorrectWords').html(''); 
            $('#listCorrectWords').append(`<p onclick="changeCorrectWords('${corrected}',${indexval})" class="highlights" >${corrected}</p>`);
            for(var i=0; i<getsuggested.length; i++){                              
                 let suggested = `<p onclick="changeCorrectWords('${getsuggested[i].text}',${indexval})" onclick="changeCorrectWords()" class="highlights"  >${getsuggested[i].text}</p>`; 
                 $('#listCorrectWords').append(suggested);              

            }
        }
    });
}

function changeCorrectWords(correctedwords, indexval){   
    spellCheckContent[indexval]=correctedwords;
    let allCorrectedWords = spellCheckContent.join(' ');
    $('#bindWords').html(allCorrectedWords);
    $('#listCorrectWords').html('');
    $('.error').html(--getbadCount);
    
}

function cleardata(){
    $('#listCorrectWords').html('');
}




