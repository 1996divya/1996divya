// import { ObjectId } from 'mongodb';
// import fs from 'fs';
// import init from "dewlinq";

// export class db{
//     public writeFileString(
//         path: string,
//         data: string,
//         append = false
//       ): void {
//         if (append) fs.appendFileSync(path, data, { encoding: 'utf8' });
//         else fs.writeFileSync(path, data, { encoding: 'utf8' });
//       }

//     public update<T>(
//         collectionName: string,
//         filter: (x: T) => boolean,
//         item: T
//       ): boolean {
//         const file = (__dirname+'mydb.json');
//         let temp: T[] = JSON.parse(file);
//         temp = this.toIdObjectArray(temp);
//         const newArray = temp.where((x) => !filter(x));
//         newArray.push(item);
//        this.writeFileString((__dirname+"mydb.json"), JSON.stringify(newArray), false);
//         return true;}



//         private toIdObjectArray(temp: any[]): any[] {
//             for (const iterator of temp) {
//               for (const key of Object.keys(iterator)) {
//                 if(key === "_id"){
//                   iterator[key] = new ObjectId(iterator[key]);
//                 }
//                 if(/^rif_.*$/.test(key))
//                 {
//                   iterator[key] = new ObjectId(iterator[key]);
//                 }
//                 if(/^data_.*$/.test(key) || /(created|updated)/.test(key))
//                 {
//                   iterator[key] = new Date(iterator[key]);
//                 }
//               }
//             }
//             return temp;
//           }
// }