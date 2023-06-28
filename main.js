const html = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type = "module" id="ID" class='class' name=name disabled></script>
    <script a = "A' b="B" c='C' d=D e f=F></script>
  </body>
</html>
`;

const elements = html.match(/<[^\/][^<>]*>/gm).map(element => {
  const tagName = element.match(/<(?<name>\S+)[\s>]/m)?.groups.name ?? '';
  const attribute = element.match(/<\S+\s(?<attrs>.+)[\/>]/m)?.groups.attrs.trim() ?? '';
  const attributes = Object.fromEntries(
    [...attribute.matchAll(/(?<k1>\S+)\s*=\s*("(?<v1>.+?)"|'(?<v2>.+?)'|(?<v3>\S+))|(?<k2>\S+[^\/])/gm)].map(match => [
      (match.groups.k1 ?? match.groups.k2).trim(),
      (match.groups.v1 ?? match.groups.v2 ?? match.groups.v3)?.trim(),
    ]),
  );

  return { tagName, attributes };
});

console.log(elements);
