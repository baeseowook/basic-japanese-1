import React, { useMemo } from 'react';

interface FuriganaTextProps {
  text: string;
  reading?: string;
  showFurigana: boolean;
  className?: string;
  rtClassName?: string;
}

export interface FuriganaSegment {
  text: string;
  rt: string;
}

/**
 * Checks if a character is a CJK Kanji character
 */
export function isKanji(ch: string): boolean {
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  return (
    (code >= 0x4e00 && code <= 0x9faf) || // CJK Unified Ideographs
    (code >= 0x3400 && code <= 0x4dbf) || // CJK Extension A
    code === 0x3005 // Ideographic iteration mark 々
  );
}

/**
 * Converts Katakana characters to Hiragana for robust text alignment
 */
export function toHiragana(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

/**
 * Generates common Japanese kana pronunciation candidates for Arabic numbers.
 * Supports units, tens, hundreds, thousands, and common euphonic variations (e.g. 800 -> はっぴゃく).
 */
export function getNumberKanaList(n: number): string[] {
  if (n < 0 || n > 999999) return [];
  const digits = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  const tens = ['', 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう', 'ろくじゅう', 'ななじゅう', 'はちじゅう', 'きゅうじゅう'];
  const hundreds = ['', 'ひゃく', 'にひゃく', 'さんびゃく', 'よんひゃく', 'ごひゃく', 'ろっぴゃく', 'ななひゃく', 'はっぴゃく', 'きゅうひゃく'];
  const thousands = ['', 'せん', 'にせん', 'さんぜん', 'よんせん', 'ごせん', 'ろくせん', 'ななせん', 'はっせん', 'きゅうせん'];

  const list = new Set<string>();

  // Frequent specific numbers and counter variations in conversational Japanese
  if (n === 800) {
    list.add('はっぴゃく');
  } else if (n === 24) {
    list.add('にじゅうよ');
    list.add('にじゅうよん');
    list.add('にじゅうし');
  } else if (n === 30) {
    list.add('さんじゅう');
    list.add('さんじゅっ');
    list.add('さんじっぷ');
  } else if (n === 10) {
    list.add('じゅう');
    list.add('じゅっ');
    list.add('とお');
  } else if (n === 3) {
    list.add('さん');
    list.add('みっ');
  } else if (n === 5) {
    list.add('ご');
    list.add('いつ');
  } else if (n === 1) {
    list.add('いち');
    list.add('いっ');
    list.add('ひと');
  } else if (n === 2) {
    list.add('に');
    list.add('ふた');
  } else if (n === 4) {
    list.add('よん');
    list.add('よ');
    list.add('し');
  } else if (n === 6) {
    list.add('ろく');
    list.add('ろっ');
  } else if (n === 7) {
    list.add('なな');
    list.add('しち');
  } else if (n === 8) {
    list.add('はち');
    list.add('はっ');
  } else if (n === 9) {
    list.add('きゅう');
    list.add('く');
  }

  // General algorithmic pronunciation
  const th = Math.floor(n / 1000);
  const h = Math.floor((n % 1000) / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  const str = (thousands[th] || '') + (hundreds[h] || '') + (tens[t] || '') + (digits[o] || '');
  if (str) list.add(str);

  return Array.from(list);
}

/**
 * Aligns kanji-bearing text with its full hiragana reading so that
 * ruby/rt is ONLY placed strictly above Kanji characters, leaving
 * hiragana, katakana, numbers, and punctuation untouched without any rt tags.
 */
export function alignTextWithFurigana(text: string, reading?: string): FuriganaSegment[] {
  if (!text) return [];
  if (!reading || text === reading) {
    return [{ text, rt: '' }];
  }

  // Check if text has any kanji
  let hasKanji = false;
  for (let i = 0; i < text.length; i++) {
    if (isKanji(text[i])) {
      hasKanji = true;
      break;
    }
  }

  // If no kanji exist in the text, no furigana is ever needed
  if (!hasKanji) {
    return [{ text, rt: '' }];
  }

  // Split text into Kanji vs non-Kanji segments
  const segments: { text: string; isKanji: boolean }[] = [];
  let currIsKanji = isKanji(text[0]);
  let currText = text[0];

  for (let i = 1; i < text.length; i++) {
    const k = isKanji(text[i]);
    if (k === currIsKanji) {
      currText += text[i];
    } else {
      segments.push({ text: currText, isKanji: currIsKanji });
      currIsKanji = k;
      currText = text[i];
    }
  }
  segments.push({ text: currText, isKanji: currIsKanji });

  // Single Kanji cluster optimization (e.g., 美味しい -> 美味, 食べる -> 食, 綺麗だ -> 綺麗, 辛くない -> 辛)
  const kanjiCount = segments.filter((s) => s.isKanji).length;
  if (kanjiCount === 1) {
    const kIdx = segments.findIndex((s) => s.isKanji);
    const prefix = segments.slice(0, kIdx).map((s) => s.text).join('');
    const suffix = segments.slice(kIdx + 1).map((s) => s.text).join('');

    let r = reading.trim();
    const prefixHira = toHiragana(prefix);
    const suffixHira = toHiragana(suffix);
    let rHira = toHiragana(r);

    if (prefix && rHira.startsWith(prefixHira)) {
      r = r.slice(prefix.length);
      rHira = rHira.slice(prefixHira.length);
    }
    if (suffix && rHira.endsWith(suffixHira)) {
      r = r.slice(0, r.length - suffix.length);
    }

    const out: FuriganaSegment[] = [];
    if (prefix) out.push({ text: prefix, rt: '' });
    out.push({ text: segments[kIdx].text, rt: r });
    if (suffix) out.push({ text: suffix, rt: '' });
    return out;
  }

  // Multi-kanji sentence alignment
  const result: FuriganaSegment[] = [];
  let rPos = 0;
  const cleanReading = reading.trim();
  const cleanReadingHira = toHiragana(cleanReading);

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!seg.isKanji) {
      result.push({ text: seg.text, rt: '' });
      const segHira = toHiragana(seg.text);

      if (rPos < cleanReading.length) {
        if (cleanReadingHira.startsWith(segHira, rPos)) {
          rPos += segHira.length;
        } else {
          // Check for Arabic numerals inside seg.text (e.g. 800 in 800円, 24 in 24時間, 30 in 30分間)
          const numMatch = seg.text.match(/\d+/);
          let matchedNumberLen = 0;
          if (numMatch) {
            const num = parseInt(numMatch[0], 10);
            const candidates = getNumberKanaList(num);
            const prefix = seg.text.slice(0, numMatch.index);
            const prefixHira = toHiragana(prefix);
            let checkPos = rPos;
            let prefixMatched = true;
            if (prefix) {
              if (cleanReadingHira.startsWith(prefixHira, checkPos)) {
                checkPos += prefixHira.length;
              } else {
                prefixMatched = false;
              }
            }
            if (prefixMatched) {
              for (const cand of candidates) {
                if (cleanReadingHira.startsWith(cand, checkPos)) {
                  matchedNumberLen = checkPos - rPos + cand.length;
                  break;
                }
              }
            }
          }

          if (matchedNumberLen > 0) {
            rPos += matchedNumberLen;
          } else {
            // Check if next segment is kanji; if so, locate its following anchor
            // Never arbitrarily add seg.text.length to rPos
            if (i + 1 < segments.length && segments[i + 1].isKanji) {
              // Let kanji look ahead find the correct segment
            }
          }
        }
      }
    } else {
      // Kanji segment
      // Look ahead for next non-kanji anchor
      let nextNonKanji = '';
      if (i + 1 < segments.length) {
        const nextSeg = segments[i + 1];
        const numMatch = nextSeg.text.match(/\d+/);
        if (numMatch) {
          const num = parseInt(numMatch[0], 10);
          const candidates = getNumberKanaList(num);
          const prefix = nextSeg.text.slice(0, numMatch.index);
          const prefixHira = toHiragana(prefix);
          if (prefixHira) {
            nextNonKanji = prefixHira;
          } else if (candidates.length > 0) {
            nextNonKanji = candidates[0];
          }
        } else {
          nextNonKanji = toHiragana(nextSeg.text.slice(0, 2));
        }
      }

      let matchIdx = -1;
      const minSearchPos = Math.min(cleanReading.length, rPos + seg.text.length);
      if (nextNonKanji) {
        matchIdx = cleanReadingHira.indexOf(nextNonKanji, minSearchPos);
      }

      if (matchIdx !== -1 && matchIdx >= rPos) {
        const kanjiRt = cleanReading.slice(rPos, matchIdx);
        result.push({ text: seg.text, rt: kanjiRt });
        rPos = matchIdx;
      } else {
        // Search subsequent anchors
        let foundSubsequent = -1;
        for (let j = i + 1; j < segments.length; j++) {
          if (!segments[j].isKanji) {
            const needle = toHiragana(segments[j].text.slice(0, 1));
            const pos = cleanReadingHira.indexOf(needle, minSearchPos);
            if (pos !== -1) {
              foundSubsequent = pos;
              break;
            }
          }
        }

        if (foundSubsequent !== -1 && foundSubsequent >= rPos) {
          result.push({ text: seg.text, rt: cleanReading.slice(rPos, foundSubsequent) });
          rPos = foundSubsequent;
        } else {
          result.push({ text: seg.text, rt: cleanReading.slice(rPos) });
          rPos = cleanReading.length;
        }
      }
    }
  }

  return result;
}

export const FuriganaText: React.FC<FuriganaTextProps> = ({
  text,
  reading,
  showFurigana,
  className = '',
  rtClassName = 'text-rose-600 font-normal text-xs',
}) => {
  const segments = useMemo(() => {
    if (!showFurigana) return null;
    return alignTextWithFurigana(text, reading);
  }, [text, reading, showFurigana]);

  if (!showFurigana || !segments) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {segments.map((seg, idx) => {
        // STRICT RULE: Only Kanji characters can ever have <ruby> and <rt>
        // Hiragana, Katakana, Punctuation, Numbers, English, etc. are NEVER wrapped in ruby/rt
        const hasKanjiChar = seg.text.split('').some(isKanji);
        if (!seg.rt || !hasKanjiChar) {
          return <span key={idx}>{seg.text}</span>;
        }
        return (
          <ruby key={idx} className="ruby-align">
            {seg.text}
            <rt className={rtClassName}>{seg.rt}</rt>
          </ruby>
        );
      })}
    </span>
  );
};
