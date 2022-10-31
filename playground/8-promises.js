const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1,2,3,4])
        reject('things went wrong!')


    }, 2000)

})

// only gets excecuted when things go well
doWorkPromise
    .then((result) => console.log(`success! ${result}`))
    .catch((error) => console.log(`error! ${error}`))