function removeLast(str){
    if(str == '' || str.length == 1)return '';
    let result = '';
    for(let i = 0; i < str.length - 1; i++){
        result += str[i]
    }
    return result;
}


function removeFirst(str){
    if(str == '' || str.length == 1)return '';
    let result = '';
    for(let i = 1; i < str.length; i++){
        result += str[i]
    }
    return result;
}

function removeChar(str,char){
    if(str == '' || str.length == 1)return '';
    let result = '';
    for(let i = 0; i < str.length; i++){
        if(str[i] == char){result += ''}else{result += str[i]}
    }
    return result;
}

function verticalPiramid(lenght){
    if(lenght == 1){'*'};
    let stars = '';
    for(let i = 0; i < lenght; i++){
        stars += '*';
        console.log(stars);
    }

    for(let i = 1; i <= lenght - 1; i++){
        let result = '';
        for(let j = 0; j < stars.length - i; j++){
            result += stars[i]
        }
        console.log(result);
    }
}

const txt = "Hello World";
console.log(removeFirst(txt));
console.log(removeLast(txt));
console.log(removeChar(txt,'l'));

verticalPiramid(5);