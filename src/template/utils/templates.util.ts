export const renameFile = (req, file, callback) => {

    const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

    console.log(`${name}-${randomName}.${fileExtName}`);
    callback(null, `${name}-${randomName}-${Date.now()}.${fileExtName}`);
  }

export const destinationFile = (req, file, callback) => {
    callback(null, './uploads');
}