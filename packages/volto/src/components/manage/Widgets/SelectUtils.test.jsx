import { normalizeValue, convertValueToVocabQuery } from './SelectUtils';

describe('normalizeValue', () => {
  it('Given an object/object, p.restapi title/token', () => {
    // choices in Vocabulary based selects that has choices and spects a string in return
    // Use case: Language select - A Choice schema that spects a string as value
    //   language = schema.Choice(
    //     title=_(u'label_language', default=u'Language'),
    //     vocabulary='plone.app.vocabularies.SupportedContentLanguages',
    //     required=False,
    //     missing_value='',
    //     defaultFactory=default_language,
    // )
    // p.restapi vocab endpoint outputs
    // "items": [{title: "English", token: "en"}, ...]
    // If value is an object, it returns correctly
    const choices = [
      { label: 'English', value: 'en' },
      { label: 'Catala', value: 'ca' },
    ];
    const value = { title: 'English', token: 'en' };
    expect(normalizeValue(choices, value)).toStrictEqual({
      label: 'English',
      value: 'en',
    });
  });

  it('Given a object/string, p.restapi title/token', () => {
    // choices in Vocabulary based selects that has choices and spects a string in return
    // Use case: Language select - A Choice schema that spects a string as value
    //   language = schema.Choice(
    //     title=_(u'label_language', default=u'Language'),
    //     vocabulary='plone.app.vocabularies.SupportedContentLanguages',
    //     required=False,
    //     missing_value='',
    //     defaultFactory=default_language,
    // )
    // p.restapi vocab endpoint outputs
    // "items": [{title: "English", token: "en"}, ...]
    // The widget sends a string as value in the PATCH/POST:
    // value: "en"
    const choices = [
      { label: 'English', value: 'en' },
      { label: 'Catala', value: 'ca' },
    ];
    const value = 'en';
    expect(normalizeValue(choices, value)).toStrictEqual({
      label: 'English',
      value: 'en',
    });
  });

  it('Given a p.restapi array of arrays/string (SimpleVocabulary/SimpleTerm) I', () => {
    // Simplest example in Plone - a "hardcoded, hand made" vocab using SimpleVocabulary/SimpleTerm
    // allow_discussion = schema.Choice(
    //     title=_(u'Allow discussion'),
    //     description=_(u'Allow discussion for this content object.'),
    //     vocabulary=SimpleVocabulary([
    //       SimpleTerm(value=True, title=_(u'Yes')),
    //       SimpleTerm(value=False, title=_(u'No')),
    //     ]),
    //     required=False,
    //     default=None,
    // )
    // p.restapi vocab endpoint outputs an array of arrays T_T
    // choices: [
    //  ["True", "Yes"],
    //  ["False","No"]
    // ]
    const choices = [
      ['True', 'Yes'],
      ['False', 'No'],
    ];
    const value = 'True';
    expect(normalizeValue(choices, value)).toStrictEqual({
      label: 'Yes',
      value: 'True',
    });
  });

  it('Given a p.restapi array of arrays/string (SimpleVocabulary/SimpleTerm) II', () => {
    const choices = [
      ['True', 'Yes'],
      ['False', 'No'],
    ];
    const value = 'False';
    expect(normalizeValue(choices, value)).toStrictEqual({
      label: 'No',
      value: 'False',
    });
  });

  it('Given a p.restapi array of arrays/string (SimpleVocabulary/SimpleTerm) III', () => {
    const choices = [
      ['True', 'Yes'],
      ['False', 'No'],
    ];
    const value = undefined;
    expect(normalizeValue(choices, value)).toStrictEqual(null);
  });

  it('Given an array of tokenized value objects, with no choices', () => {
    const choices = [];
    const value = [
      { title: 'Option 1', value: 'opt1' },
      { title: 'Option 2', value: 'opt2' },
    ];
    expect(normalizeValue(choices, value)).toStrictEqual([
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ]);
  });

  it('Given an array of strings, with no choices', () => {
    const choices = [];
    const value = ['opt1', 'opt2'];
    expect(normalizeValue(choices, value)).toStrictEqual([
      { label: 'opt1', value: 'opt1' },
      { label: 'opt2', value: 'opt2' },
    ]);
  });
});

describe('convertValueToVocabQuery', () => {
  it('converts an array of token/title to token query', () => {
    const value = [
      {
        title: 'Option 1',
        token: 'option1',
      },
      {
        title: 'Option 100',
        token: 'option100',
      },
      {
        title: 'Option 103',
        token: 'option103',
      },
    ];
    expect(convertValueToVocabQuery(value)).toStrictEqual({
      tokens: ['option1', 'option100', 'option103'],
    });
  });

  it('converts an array of label/value to tokens query', () => {
    const value = [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 100',
        value: 'option100',
      },
      {
        label: 'Option 103',
        value: 'option103',
      },
    ];
    expect(convertValueToVocabQuery(value)).toStrictEqual({
      tokens: ['option1', 'option100', 'option103'],
    });
  });

  it('converts arrays of strings to tokens query', () => {
    const value = ['option1', 'option100', 'option103'];
    expect(convertValueToVocabQuery(value)).toStrictEqual({
      tokens: ['option1', 'option100', 'option103'],
    });
  });

  it('converts a string to token query', () => {
    const value = 'option1';
    expect(convertValueToVocabQuery(value)).toStrictEqual({ token: 'option1' });
  });
});
