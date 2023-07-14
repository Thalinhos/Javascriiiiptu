function main() {

    function firstLetter(firstName, lastName) {

        let listOne = firstName.split('') 
        let listTwo = lastName.split('')

        let nameAll = [...listOne, ' ' ,...listTwo]

        let nameCapittal = nameAll.map((item) => {
            return item.toUpperCase();
        })
        
        console.log(nameCapittal)

        console.log(nameAll)
      
        console.log(listOne[0], listTwo[0]); 


    }

    firstLetter("John", "Doe");

}

main();
