
const fs = require('fs')



class Wordle{
    constructor(){
 
        this.not_in_word = ['l']
        this.in_word = []
        this.maybe = []

        this.previous_maybe_index = []

        this.word_list = [] 
        
        fs.readFileSync('words.txt','utf-8').split('\n').forEach(line => {
            this.word_list.push(line.replace('\r',''))
        })



        this.guess_list = [['y',0,'false'],['o',1,'false'],['n',2,'maybe'],['i',3,'false'],['c',4,'maybe']]
        this.checker()

        
        this.guess_list = [['b',0,'false'],['e',1,'false'],['n',2,'maybe'],['c',3,'maybe'],['h',4,'maybe']]
        this.checker()
        this.guess_list = [['c',0,'true'],['h',1,'true'],['a',2,'false'],['n',3,'true'],['t',4,'false']]
        this.checker()/*
        this.guess_list = [['c',0,'true'],['h',1,'true'],['u',2,'true'],['n',3,'true'],['k',4,'true']]
        this.checker()*/



        

        
    }


    checkForFalse = (array) => {
        let return_array = []

        //console.log(array)

        for(var i = 0; i < array.length;i++){
            let bad_word = false
            for(var k = 0; k < this.not_in_word.length;k++){
                if(array[i].includes(this.not_in_word[k])){
                    bad_word = true
                }
            }

            if(!bad_word){
                return_array.push(array[i])
            }
        }
        //console.log(return_array)
        
        return return_array
    }

    checkForMaybe = (array) => {
        let return_array = []
        let value_array = []

        this.maybe.forEach(letter_list => {
            value_array.push(letter_list[0])
        })
        if(this.maybe.length == 0){return array}
        array.forEach(word => {
            this.maybe.forEach(maybe_list => {
                if(word.includes(maybe_list[0]) & word[maybe_list[1]] != maybe_list[0] & !return_array.includes(word)){
                    if(value_array.every(item => {
                        if(word.includes(item)){
                            return true
                        }//ok
                    })){
                        return_array.push(word)
                    }
                }
            })
        })

        

        return return_array
    }

    checkForTrue = (array) => {
        let return_array = []
        let value_array = []

        this.in_word.forEach(letter => {
            value_array.push(letter[0])
        })

        array.forEach(word => {
            if(value_array.every(item => {
                return word.includes(item)
            })){
                let validator = []
                this.in_word.forEach(letter => {
                    
                    if(word[letter[1]] == letter[0]){
                        validator.push(true)
                    }else{
                        validator.push(false)
                    }
                })

                if(validator.every(item => {
                    if(item == true){
                        return true
                    }
                })){
                    return_array.push(word)
                }
            }
        })

        return return_array
    }

    checker = () => {

        this.guess_list.forEach(guess => {
            guess[2] == 'maybe' ? this.maybe.push(guess) : guess[2] == 'true' ? this.in_word.push(guess) : this.not_in_word.push(guess[0])
        })

        //console.log(this.not_in_word)
        //console.log(this.not_in_word,this.in_word,this.maybe)
        let result_1 = this.checkForFalse(this.word_list)
        //console.log(result_1)
        let result_2 = this.checkForMaybe(result_1)
        //console.log(result_2)
        let result_3= this.checkForTrue(result_2)
        this.word_list = result_3
        //console.log('ok')
        console.log(result_3)
    }


}


new Wordle