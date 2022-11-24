import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StaticContent } from './@dto/static-content.dto';

export function retrieve_and_cache<T>(
  cache_id: string,
  default_value: T,
  http_client: HttpClient,
  resource_url: string,
  retrieve_from_cache_only = false,
  cache_result = true,
  noise_properties = [
    'validation',
    'transContext',
    'errorMessage',
    'message',
    'succeed',
  ]
): Observable<T> {
  let cache = localStorage.getItem(cache_id);

  if (retrieve_from_cache_only == true) {
    return cache
      ? of((JSON.parse(cache) as StaticContent<T>).value)
      : of(default_value);
  }

  if (cache) {
    let res = JSON.parse(cache) as StaticContent<T>;
    if (moment.utc().isBefore(moment.unix(+res.expiry))) {
      return of(res.value);
    }
  }

  return http_client.get(resource_url).pipe(
    catchError((x) => {
      console.warn('Could not refresh from service.');
      return of(null);
    }),
    tap((x) => {
      if (x != null && cache_result == true) {
        var expiryDate = moment
          .utc()
          .add(
            environment.cache_settings.val as any,
            environment.cache_settings.type as any
          )
          .unix();
        x = unset_noise_properties(x, noise_properties);
        localStorage.setItem(
          cache_id,
          JSON.stringify({
            expiry: expiryDate,
            value: x,
          })
        );
      }
    }),
    map((x) => {
      if (x) return x as T;
      // fallback to the cache if there is any
      let cache = localStorage.getItem(cache_id);
      if (cache) {
        let res = JSON.parse(cache) as StaticContent<T>;
        return res.value;
      }
      return default_value;
    })
  );
}

export function log_error(err: any) {
  if (environment.production == true) {
    console.warn(err);
    return;
  }
  alert(err);
}

export function is_object(v: any) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

export function unset_noise_properties(
  obj: any,
  noise_properties = [
    'validation',
    'transContext',
    'errorMessage',
    'message',
    'succeed',
  ]
): any {
  if (is_object(obj)) {
    noise_properties.forEach((x) => {
      delete obj[x];
    });
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((x) => unset_noise_properties(x, noise_properties));
  }
  return obj;
}

// export function makeTitleFromUrlLowerAnd(val: string) {
// // if (!val) return val;
// return makeTitleFromUrl(val).split('and').join('<span class="text-lowercase">and</span>').toLowerCase();
// }

// export function makeTitleFromUrlUpperParenthesis(val: string) {
// const converted = val.replace('(', '(<span class="donothing">');
// const mixed = converted.replace(')', '</span>)');
// return mixed;
// }

export function makeTitleFromUrl(val: string): string {
  // if (!val) return val;

  if (val.includes('_')) {
    return val
      .split('_')
      .map((x) => makeTitleFromUrl(x as string))
      .join('/');
  }

  if (val.includes('~')) {
    return val
      .split('~')
      .map((x) => makeTitleFromUrl(x as string))
      .join('\\');
  }

  if (val.includes('-')) {
    return val
      .split('-')
      .map((x) => makeTitleFromUrl(x as string))
      .join(' ');
  }

  if (val.toLowerCase() == 'and') {
    return val.toLowerCase();
  }

  return capitalize(val);
}

export const capitalize = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};


export const r_sort = (a: any, b: any, field: string, asc: boolean) => {
  let reverse = asc ? 1 : -1;
  if (a[field] > b[field]) {
    return 1 * reverse;
  } else if (b[field] > a[field]) {
    return -1 * reverse;
  } else {
    return 0;
  }
};


export const copy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
}

export function B64ImageSrc(b64: string) {
  let ext = '';

  switch (b64.slice(0, 3)) {
    case '/9j':
      ext = 'jpg';
      break;
    case 'iVB':
      ext = 'png';
      break;
    case 'Qk0':
      ext = 'bmp';
      break;
    case 'SUk':
      ext = 'TIFF';
      break;
    // case "JVB":
    //   ext = 'PDF'
    //   break;
    // case "UEs":
    //   ext = 'OFD'
    //   break;
    default:
      throw new Error('Invalid base64 image');
  }
  return `data:image/${ext};base64, ${b64}`;
}