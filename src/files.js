/* @flow */
import path from "path";
import fs from "fs";

class Files {
    static getCurrentDirectoryBase() {
        return path.basename(process.cwd());
    }

    static directoryExists(filePath) {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    }
}
export default Files;
