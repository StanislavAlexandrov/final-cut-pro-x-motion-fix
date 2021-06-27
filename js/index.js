const butOpenFile = document.querySelector('.butOpenFile');
let fileHandle;
butOpenFile.addEventListener('click', async () => {
    // Destructure the one-element array.
    [fileHandle] = await window.showOpenFilePicker();
    // Do something with the file handle.
    const file = await fileHandle.getFile();
    console.log(file.name);
    const contents = await file.text();
    let re = /<layer\sname="Separators"[\s\S]*?<\/layer>/g;
    let newContents = contents.replaceAll(re, ' ');
    console.log(newContents);
    const options = {
        suggestedName: file.name,
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.moti'],
                },
            },
        ],
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(newContents);
    await writable.close();
});
