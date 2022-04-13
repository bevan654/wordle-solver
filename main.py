
import re
import json









class Wordle:
    def __init__(self):
        self.words_list = self.OPENTXT()

        self.word_at_index = {'h':1,'c':0} 
        self.in_word = ['h','c']
        self.not_in_word = ['a','r','o','s','e','t','r','l','i']

        self.getPossible()

       
        

    def checkWord(self,word,array):
        for i in array:
            if i in word:
                return True
                
        return False
        
    def getAllInWord(self,array):
        z = []
        for i in array:
            if all(letter in i for letter in self.in_word):
                z.append(i)

        return z

    def getAllNotINWord(self,array):
        ez = []
        for i in array:
            if not any(k in i for k in self.not_in_word):
                ez.append(i)


        return ez

    def getWordAtIndex(self,array):
        return_array = []
        
        for i in array:
            checkable = []
            for k in self.word_at_index:
                if i[self.word_at_index[k]] == k:
                    checkable.append(True)
                else:
                    checkable.append(False)

            if all(condition == True for condition in checkable):
                return_array.append(i)


            checkable.append(False)

        return return_array

                    

                
    def getPossible(self):
        result_1 = self.getAllInWord(self.getAllNotINWord(self.words_list))
        if len(self.word_at_index) != 0:
            result_2 = self.getWordAtIndex(result_1)
                    
            print(result_2)
        else:
            print(result_1)








    def OPENTXT(self):

        word_list = []

        with open('words.txt','r',encoding='utf-8') as e:
            for i in e.readlines():
                word_list.append(i.strip())


        return word_list




Wordle()
