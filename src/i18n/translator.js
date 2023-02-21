export function arg() {
  return TranslatorArg;
}

export function use(translators) {
  return new Translators(translators);
}

export function trans(original, ...translations) {
  //   {
  //     original: ['abc', arg(), 'def'],
  //     translations: [{ locale: 'en', translation: (a) => 'abc' + a + 'def' }];
  //   }
  return {
    original,
    translations
  };
}

function TranslatorArg() {}

function Translators(translators) {
  this.translators = translators || [];
}

Translators.prototype.translate = function (lang, texts) {
  for (const { original, translations } of this.translators) {
    const [matched, args] = this.matching(original, texts);

    if (!matched) {
      continue;
    }

    for (const { locale, translation } of translations) {
      if (locale === lang) {
        if (typeof translation === 'function') {
          return translation.apply(null, args);
        }
        return translation;
      }
    }
    break;
  }

  return texts.join('');
};

Translators.prototype.matching = function (left, right) {
  if (left.length !== right.length) {
    return [false, []];
  }

  const args = [];
  for (let i = 0; i < left.length; i++) {
    const l = left[i];
    const r = right[i];

    if (l !== r && l !== TranslatorArg) {
      return [false, []];
    }

    if (l === TranslatorArg) {
      args.push(r);
    }
  }

  return [true, args];
};
