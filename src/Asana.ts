export interface ITask {
    workspace: string;
    projects: string[];
    name: string;
    notes?: string;
    custom_fields?: { [custom_filed_gid: string]: string | number }
}

export default class Asana {
    public static ENDPOINT = 'https://app.asana.com/api/1.0';
    private token: string;
    constructor(PERSONEL_ACCESS_TOKEN: string) {
        this.token = PERSONEL_ACCESS_TOKEN;
    }
    create(task: ITask) {
        const res = this.query(`${Asana.ENDPOINT}/tasks`, 'post', { data: task });
        return res;
    }
    list(project_gid: string, all?: boolean) {
        if(all){
            const res = this.query(`${Asana.ENDPOINT}/tasks?project=${project_gid}`, 'get');
            return res;
        } else {
            const res = this.query(`${Asana.ENDPOINT}/tasks?project=${project_gid}&completed_since=now`, 'get');
            return res;
        }
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