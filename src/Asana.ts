export interface ITask {
    workspace: string;
    projects: string[];
    name: string;
    notes?: string;
    custom_fields?: { [custom_filed_gid: string]: string|number}
}

export default class Asana {
    public static ENDPOINT = 'https://app.asana.com/api/1.0';
    private token: string;
    constructor(PERSONEL_ACCESS_TOKEN: string) {
        this.token = PERSONEL_ACCESS_TOKEN;
    }
    create(task: ITask) {
        return this.query(`${Asana.ENDPOINT}/tasks`, 'post', { data: task });
    }

    private query(url: string, method: 'get' | 'post' | 'put', params?: Object) {
        return JSON.parse(UrlFetchApp.fetch(url, {
            method: method,
            payload: params ? JSON.stringify(params) : undefined,
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        }).getContentText());
    }
}