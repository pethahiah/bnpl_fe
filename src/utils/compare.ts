export const compare = (a: any, b: any) => {
    // @ts-ignore
    if (a.created_at > b.created_at) {
      return 1;
      // @ts-ignore
    } else if (a.created_at < b.created_at) {
      return -1;
    }
    return 0;
  }