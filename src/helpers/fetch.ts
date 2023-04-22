export function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    return fetch(input, init!).then(res => res.json());
}
