import QRCode from "qrcode"
import { QRCodeFileType } from "../../types/index.js"

/**
 *
 * @param dirPath <string> - the path to the directory where the QR Code will be stored.
 * @param fileName <string> - the name of the file.
 * @param key <string> - the key to be converted to a QR Code.
 * @param type <QRCodeFileType> - the different type of files where is possible to store the QR Code.
 */
export default (dirPath: string, fileName: string, key: string, type: QRCodeFileType): void => {
  QRCode.toFile(`${dirPath}/${fileName}.${type}`, key, {
    type,
    // 'H' can resist the damage to symbol by ~30%
    errorCorrectionLevel: "H"
  })
}
