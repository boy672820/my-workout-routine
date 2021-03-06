import axios, { AxiosResponse } from 'axios'
import { RecordItemCreateDTO } from './dto/record.item.create.dto';
import { RecordCreateDTO } from './dto/record.create.dto';
import { RecordItemCompleteDTO } from './dto/record.item.complete.dto';
import { RecordItemUpdateDTO } from './dto/record.item.update.dto';
import { RecordItemDisableDTO } from './dto/record.item.disable.dto';


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

    public static getRecordItemsByRecordId( record_id: number ): Promise<AxiosResponse> {
        return axios( {
            method: 'get',
            url: `/record/record-item/${record_id}`
        } )
    }

    public static createRecordItem( data: RecordItemCreateDTO ): Promise<AxiosResponse> {
        return axios( {
            method: 'post',
            url: `/record/record-item`,
            data: data
        } )
    }

    public static updateRecordItem( record_item_id: number, data: RecordItemUpdateDTO ): Promise<AxiosResponse> {
        return axios( {
            method: 'patch',
            url: `/record/record-item/${record_item_id}`,
            data: data
        } )
    }

    public static updateComplete( data: RecordItemCompleteDTO ): Promise<AxiosResponse> {
        return axios( {
            method: 'patch',
            url: '/record/record-item/complete',
            data: data
        } )
    }

    public static disableRecordItem( data: RecordItemDisableDTO ): Promise<AxiosResponse> {
        return axios( {
            method: 'patch',
            url: '/record/record-item/disable',
            data: data
        } )
    }
}