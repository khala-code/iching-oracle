// ─── Hexagrams ─────────────────────────────────────────────────────────
// Key: 6-char binary string, line 1 (bottom) first → line 6 (top) last
// yang = 1, yin = 0
// Lower trigram = chars 0-2 (lines 1-3), upper trigram = chars 3-5 (lines 4-6)

export interface HexagramData {
  number: number;
  chinese: string;
  pinyin: string;
  english: string;
  lower: string;
  upper: string;
}

export const HEXAGRAMS: Record<string, HexagramData> = {
  '111111': { number:  1, chinese: '乾',   pinyin: 'Qián',       english: 'The Creative',                        lower: '111', upper: '111' },  // Heaven/Heaven
  '000000': { number:  2, chinese: '坤',   pinyin: 'Kūn',        english: 'The Receptive',                       lower: '000', upper: '000' },  // Earth/Earth
  '100010': { number:  3, chinese: '屯',   pinyin: 'Zhūn',       english: 'Difficulty at the Beginning',         lower: '100', upper: '010' },  // Thunder/Water
  '010001': { number:  4, chinese: '蒙',   pinyin: 'Méng',       english: 'Youthful Folly',                      lower: '010', upper: '001' },  // Water/Mountain
  '111010': { number:  5, chinese: '需',   pinyin: 'Xū',         english: 'Waiting',                             lower: '111', upper: '010' },  // Heaven/Water
  '010111': { number:  6, chinese: '讼',   pinyin: 'Sòng',       english: 'Conflict',                            lower: '010', upper: '111' },  // Water/Heaven
  '010000': { number:  7, chinese: '师',   pinyin: 'Shī',        english: 'The Army',                            lower: '010', upper: '000' },  // Water/Earth
  '000010': { number:  8, chinese: '比',   pinyin: 'Bǐ',         english: 'Holding Together',                    lower: '000', upper: '010' },  // Earth/Water
  '111011': { number:  9, chinese: '小畜', pinyin: 'Xiǎo Chù',   english: 'Small Taming',                        lower: '111', upper: '011' },  // Heaven/Wind
  '110111': { number: 10, chinese: '履',   pinyin: 'Lǚ',         english: 'Treading',                            lower: '110', upper: '111' },  // Lake/Heaven
  '111000': { number: 11, chinese: '泰',   pinyin: 'Tài',        english: 'Peace',                               lower: '111', upper: '000' },  // Heaven/Earth
  '000111': { number: 12, chinese: '否',   pinyin: 'Pǐ',         english: 'Standstill',                          lower: '000', upper: '111' },  // Earth/Heaven
  '101111': { number: 13, chinese: '同人', pinyin: 'Tóng Rén',   english: 'Fellowship',                          lower: '101', upper: '111' },  // Fire/Heaven
  '111101': { number: 14, chinese: '大有', pinyin: 'Dà Yǒu',    english: 'Great Possession',                    lower: '111', upper: '101' },  // Heaven/Fire
  '001000': { number: 15, chinese: '谦',   pinyin: 'Qiān',       english: 'Modesty',                             lower: '001', upper: '000' },  // Mountain/Earth
  '000100': { number: 16, chinese: '豫',   pinyin: 'Yù',         english: 'Enthusiasm',                          lower: '000', upper: '100' },  // Earth/Thunder
  '100110': { number: 17, chinese: '随',   pinyin: 'Suí',        english: 'Following',                           lower: '100', upper: '110' },  // Thunder/Lake
  '011001': { number: 18, chinese: '蛊',   pinyin: 'Gǔ',         english: 'Work on the Decayed',                 lower: '011', upper: '001' },  // Wind/Mountain
  '110000': { number: 19, chinese: '临',   pinyin: 'Lín',        english: 'Approach',                            lower: '110', upper: '000' },  // Lake/Earth
  '000011': { number: 20, chinese: '观',   pinyin: 'Guān',       english: 'Contemplation',                       lower: '000', upper: '011' },  // Earth/Wind
  '100101': { number: 21, chinese: '噬嗑', pinyin: 'Shì Kè',    english: 'Biting Through',                      lower: '100', upper: '101' },  // Thunder/Fire
  '101001': { number: 22, chinese: '贲',   pinyin: 'Bì',         english: 'Grace',                               lower: '101', upper: '001' },  // Fire/Mountain
  '000001': { number: 23, chinese: '剥',   pinyin: 'Bō',         english: 'Splitting Apart',                     lower: '000', upper: '001' },  // Earth/Mountain
  '100000': { number: 24, chinese: '复',   pinyin: 'Fù',         english: 'Return',                              lower: '100', upper: '000' },  // Thunder/Earth
  '100111': { number: 25, chinese: '无妄', pinyin: 'Wú Wàng',   english: 'Innocence',                           lower: '100', upper: '111' },  // Thunder/Heaven
  '111001': { number: 26, chinese: '大畜', pinyin: 'Dà Chù',    english: 'Great Taming',                        lower: '111', upper: '001' },  // Heaven/Mountain
  '100001': { number: 27, chinese: '颐',   pinyin: 'Yí',         english: 'Nourishment',                         lower: '100', upper: '001' },  // Thunder/Mountain
  '011110': { number: 28, chinese: '大过', pinyin: 'Dà Guò',    english: 'Great Excess',                        lower: '011', upper: '110' },  // Wind/Lake
  '010010': { number: 29, chinese: '坎',   pinyin: 'Kǎn',        english: 'The Abysmal',                         lower: '010', upper: '010' },  // Water/Water
  '101101': { number: 30, chinese: '离',   pinyin: 'Lí',         english: 'The Clinging',                        lower: '101', upper: '101' },  // Fire/Fire
  '001110': { number: 31, chinese: '咸',   pinyin: 'Xián',       english: 'Influence',                           lower: '001', upper: '110' },  // Mountain/Lake
  '011100': { number: 32, chinese: '恒',   pinyin: 'Héng',       english: 'Duration',                            lower: '011', upper: '100' },  // Wind/Thunder
  '001111': { number: 33, chinese: '遁',   pinyin: 'Dùn',        english: 'Retreat',                             lower: '001', upper: '111' },  // Mountain/Heaven
  '111100': { number: 34, chinese: '大壮', pinyin: 'Dà Zhuàng', english: 'Great Power',                         lower: '111', upper: '100' },  // Heaven/Thunder
  '000101': { number: 35, chinese: '晋',   pinyin: 'Jìn',        english: 'Progress',                            lower: '000', upper: '101' },  // Earth/Fire
  '101000': { number: 36, chinese: '明夷', pinyin: 'Míng Yí',   english: 'Darkening of the Light',              lower: '101', upper: '000' },  // Fire/Earth
  '101011': { number: 37, chinese: '家人', pinyin: 'Jiā Rén',   english: 'The Family',                          lower: '101', upper: '011' },  // Fire/Wind
  '101110': { number: 38, chinese: '睽',   pinyin: 'Kuí',        english: 'Opposition',                          lower: '101', upper: '110' },  // Fire/Lake
  '001010': { number: 39, chinese: '蹇',   pinyin: 'Jiǎn',       english: 'Obstruction',                         lower: '001', upper: '010' },  // Mountain/Water
  '010100': { number: 40, chinese: '解',   pinyin: 'Xiè',        english: 'Deliverance',                         lower: '010', upper: '100' },  // Water/Thunder
  '110001': { number: 41, chinese: '损',   pinyin: 'Sǔn',        english: 'Decrease',                            lower: '110', upper: '001' },  // Lake/Mountain
  '100011': { number: 42, chinese: '益',   pinyin: 'Yì',         english: 'Increase',                            lower: '100', upper: '011' },  // Thunder/Wind
  '111110': { number: 43, chinese: '夬',   pinyin: 'Guài',       english: 'Breakthrough',                        lower: '111', upper: '110' },  // Heaven/Lake
  '011111': { number: 44, chinese: '姤',   pinyin: 'Gòu',        english: 'Coming to Meet',                      lower: '011', upper: '111' },  // Wind/Heaven
  '000110': { number: 45, chinese: '萃',   pinyin: 'Cuì',        english: 'Gathering Together',                  lower: '000', upper: '110' },  // Earth/Lake
  '011000': { number: 46, chinese: '升',   pinyin: 'Shēng',      english: 'Pushing Upward',                      lower: '011', upper: '000' },  // Wind/Earth
  '010110': { number: 47, chinese: '困',   pinyin: 'Kùn',        english: 'Oppression',                          lower: '010', upper: '110' },  // Water/Lake
  '011010': { number: 48, chinese: '井',   pinyin: 'Jǐng',       english: 'The Well',                            lower: '011', upper: '010' },  // Wind/Water
  '110101': { number: 49, chinese: '革',   pinyin: 'Gé',         english: 'Revolution',                          lower: '110', upper: '101' },  // Lake/Fire
  '011101': { number: 50, chinese: '鼎',   pinyin: 'Dǐng',       english: 'The Cauldron',                        lower: '011', upper: '101' },  // Wind/Fire
  '100100': { number: 51, chinese: '震',   pinyin: 'Zhèn',       english: 'The Arousing',                        lower: '100', upper: '100' },  // Thunder/Thunder
  '001001': { number: 52, chinese: '艮',   pinyin: 'Gèn',        english: 'Keeping Still',                       lower: '001', upper: '001' },  // Mountain/Mountain
  '001011': { number: 53, chinese: '渐',   pinyin: 'Jiàn',       english: 'Development',                         lower: '001', upper: '011' },  // Mountain/Wind
  '110100': { number: 54, chinese: '归妹', pinyin: 'Guī Mèi',   english: 'The Marrying Maiden',                 lower: '110', upper: '100' },  // Lake/Thunder
  '100101': { number: 55, chinese: '丰',   pinyin: 'Fēng',       english: 'Abundance',                           lower: '100', upper: '101' },  // Thunder/Fire
  '001101': { number: 56, chinese: '旅',   pinyin: 'Lǚ',         english: 'The Wanderer',                        lower: '001', upper: '101' },  // Mountain/Fire
  '011011': { number: 57, chinese: '巽',   pinyin: 'Xùn',        english: 'The Gentle',                          lower: '011', upper: '011' },  // Wind/Wind
  '110110': { number: 58, chinese: '兑',   pinyin: 'Duì',        english: 'The Joyous',                          lower: '110', upper: '110' },  // Lake/Lake
  '010011': { number: 59, chinese: '涣',   pinyin: 'Huàn',       english: 'Dispersion',                          lower: '010', upper: '011' },  // Water/Wind
  '110010': { number: 60, chinese: '节',   pinyin: 'Jié',        english: 'Limitation',                          lower: '110', upper: '010' },  // Lake/Water
  '110011': { number: 61, chinese: '中孚', pinyin: 'Zhōng Fú',  english: 'Inner Truth',                         lower: '110', upper: '011' },  // Lake/Wind
  '001100': { number: 62, chinese: '小过', pinyin: 'Xiǎo Guò',  english: 'Small Excess',                        lower: '001', upper: '100' },  // Mountain/Thunder
  '101010': { number: 63, chinese: '既济', pinyin: 'Jì Jì',     english: 'After Completion',                    lower: '101', upper: '010' },  // Fire/Water
  '010101': { number: 64, chinese: '未济', pinyin: 'Wèi Jì',    english: 'Before Completion',                   lower: '010', upper: '101' },  // Water/Fire
};
