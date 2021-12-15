import { Table } from "antd";
import { useEffect, useState } from "react";

const _translationsFile: any[] = [
  {
    "id": "8be469fd-312e-4cc5-8919-968825078cfc",
    "lng": "pl",
    "key": "Definiëren",
    "value": "Definiowaniu"
  },
  {
    "id": "d430e554-0537-4d0f-83b1-2a1451c6610f",
    "lng": "pl",
    "key": "Etiket",
    "value": "Etykieta"
  },
  {
    "id": "8ed7c537-03bd-45ad-a144-63fa70d8e331",
    "lng": "pl",
    "key": "Gemiste etiketten",
    "value": "Pominięte etykiety"
  },
  {
    "id": "1add6cfa-ff59-4dc5-be63-31866fda2dac",
    "lng": "pl",
    "key": "Afwijkende etiketten",
    "value": "Anormalny etykiety"
  },
  {
    "id": "e6aa2415-b315-4e64-a288-8d3a039acc0e",
    "lng": "pl",
    "key": "Etiketteermachine",
    "value": "Maszyna do etykietowania"
  },
  {
    "id": "b1ebe9f9-748c-48ee-99d4-1326a58232bc",
    "lng": "en",
    "key": "Definiëren",
    "value": "Define"
  },
  {
    "id": "632ad5d3-d77e-4915-9cd5-3c57ca5e6a09",
    "lng": "en",
    "key": "hivasislis",
    "value": "Hi Vasilis"
  },
  {
    "id": "b7d5cf0d-a123-4c53-bc60-30fd04a5979e",
    "lng": "en",
    "key": "Oude lijm",
    "value": "Old glue"
  },
  {
    "id": "c3ff3d0f-b76b-43ef-bb07-ce807e7d812a",
    "lng": "en",
    "key": "Etiket",
    "value": "Label"
  },
  {
    "id": "91ce72d5-44fb-49ad-aad7-b5b7579b0801",
    "lng": "en",
    "key": "Gemiste etiketten",
    "value": "Missing labels"
  },
  {
    "id": "e7b2fd63-ee8d-4ba7-8e7c-08d2e1d38d93",
    "lng": "en",
    "key": "Afwijkende etiketten",
    "value": "Anormalny labels"
  },
  {
    "id": "710439fd-7227-4d79-b726-7b4224785138",
    "lng": "en",
    "key": "Etiketteermachine",
    "value": "Labelmachine"
  },
  {
    "id": "ca0ddfe1-b96d-4b22-8f13-d5e0633fc97d",
    "lng": "af",
    "key": "Stilstand definiëren",
    "value": "ولاړ تعریف کړئ"
  },
  {
    "id": "8cb61371-ad02-4b71-bb00-2a962f96f165",
    "lng": "af",
    "key": "Definiërenaf",
    "value": "تعریف کول"
  },
  {
    "id": "94259d45-a35c-4a27-82e2-3b8e8b9f059b",
    "lng": "af",
    "key": "Etiket",
    "value": "لیبل"
  },
  {
    "id": "52654e0d-2693-4ee2-b57c-ba7e2be57807",
    "lng": "af",
    "key": "Gemiste etiketten",
    "value": "ورک شوي لیبلونه"
  },
  {
    "id": "6f86d527-1a72-4ddb-8ce7-807339995c92",
    "lng": "af",
    "key": "Afwijkende etiketten",
    "value": "د ځنګل څخه سلامونه"
  },
  {
    "id": "5d844abd-5551-4333-b601-2b962351ac73",
    "lng": "af",
    "key": "Etiketteermachine",
    "value": "د لیبل کولو ماشین"
  }
]

const TranslationColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'English',
    dataIndex: 'en',
    key: 'en',
  },
  {
    title: 'Polish',
    dataIndex: 'pl',
    key: 'pl',
  },
  {
    title: 'Afghan',
    dataIndex: 'af',
    key: 'af',
  },
];

export default function TranslationsList() {
  const [Translations, setTranslations] = useState<any>([]);

  useEffect(() => {
    const _TranslationsList: any[] = [];
    console.log(_translationsFile.length)
    _translationsFile.forEach((entry, index) => {
      if (_TranslationsList.find(t => t.title === entry.key)) {
        const indexToChange = _TranslationsList.findIndex(t => t.title === entry.key);
        _TranslationsList[indexToChange][entry.lng] = entry.value;
      } else {
        const obj: any = {};
        obj.key = index.toString();
        obj.title = entry.key;
        obj[entry.lng] = entry.value;
        _TranslationsList.push(obj);
      }
    });
    console.log(_TranslationsList);
    setTranslations(_TranslationsList);
  }, []);

  return (<div>
    {<Table dataSource={Translations} columns={TranslationColumns} scroll={{ y: 350 }} />}
  </div>)

}