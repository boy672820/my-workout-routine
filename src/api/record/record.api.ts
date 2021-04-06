import axios, { AxiosResponse } from 'axios'
import { RecordItemCreateDTO } from './dto/record.item.create.dto';
import { RecordCreateDTO } from './dto/record.create.dto';


export class RecordAPI {
    public static getOrCreateRecord( data: RecordCreateDTO ): Promise<AxiosResponse> {
        return axios( {
            method: 'post',
            url: '/record/get-or-create',
            data: data
        } )
    }

    public static getRecordWithBlock( record_id: number ): Promise<AxiosResponse> {
        return axios( {
            method: 'get',
            url: `/record/with-block/${record_id}`
        } )
    }

    public static createRecordItem( data: RecordItemCreateDTO ): Promise<AxiosResponse> {
        return axios( {
            method: 'post',
            url: `/record-item`,
            data: data
        } )
    }
}