
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import i18n from "./i18n";
import './App.css'
import { postData } from "./requests";

const languages = { nl: "Dutch", ar: 'Arabic', fr: "French" };

export default function App() {
  const [ShowTranslations, setShowTranslations] = useState<boolean>(true);
  const [ResourcesLocal, setResourcesLocal] = useState<Record<string, string> | null>(null);
  const [ActiveLanguage, setActiveLanguage] = useState<string>('nl');
  const { t } = useTranslation();

  useEffect(() => {
    // fetchResources();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (ResourcesLocal) {
      console.log('Updating Resources')
      i18n.addResourceBundle('nl', 'namespace1', ResourcesLocal);
      setShowTranslations(true);
    }
  }, [ResourcesLocal]);

  function fetchResources() {
    setShowTranslations(false);
    fetch('assets/locales/fr/translation.json')
      .then(response => response.json())
      .then(data => {
        i18n.addResourceBundle('fr', 'namespace1', data);
        console.log(data);
      });
    fetch('assets/locales/ar/translation.json')
      .then(response => response.json())
      .then(data => {
        i18n.addResourceBundle('ar', 'namespace1', data);
        console.log(data);
      });
    fetch('assets/locales/nl/translation.json')
      .then(response => response.json())
      .then(data => {
        setResourcesLocal(data);
        console.log(data);
      });
  }

  function modifyResources() {
    if (ResourcesLocal) {
      setShowTranslations(false);
      console.log("Modifying...")
      const newResources = {
        "app_title": "Titel Mod",
        "language": "Taal Mod",
        "welcome_message": "Welkom Mod"
      }
      setResourcesLocal(newResources);
    } else {
      alert('Try importing first :)')
    }
  }

  const imgBaseUrl = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/'
  const menu = (
    <Menu onClick={handleLanguageSwitch}>
      <Menu.Item className={`${ActiveLanguage === 'nl' ? 'active' : ''}`} key="nl"><img alt="Dutch" src={`${imgBaseUrl}NL.svg`} /> Dutch</Menu.Item>
      <Menu.Item className={`${ActiveLanguage === 'fr' ? 'active' : ''}`} key="fr"><img alt="French" src={`${imgBaseUrl}FR.svg`} /> French</Menu.Item>
      <Menu.Item className={`${ActiveLanguage === 'ar' ? 'active' : ''}`} key="ar"><img alt="Arabic" src={`${imgBaseUrl}SA.svg`} /> Arabic</Menu.Item>
    </Menu>
  );

  function handleLanguageSwitch({ key }) {
    if (key !== ActiveLanguage) {
      console.log("Switching language to: " + key);
      i18n.changeLanguage(key);
      setActiveLanguage(key);
    }
  }

  async function exportData() {
    if (ResourcesLocal) {
      console.log('Exporting resources: ', ResourcesLocal);
      alert('Exporting resources: ' + JSON.stringify(ResourcesLocal));

      const [resOk, res] = await postData('/exportlocalesendpoint?lang=en', ResourcesLocal);
      if (resOk) {
        console.log('Export successful! ', res);
      } else {
        console.log('Export failed! ', res);
      }

    } else {
      alert('Try importing first :)')
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <header>
        <Dropdown overlay={menu} trigger={['click']}>
          <h3 style={{ color: "white" }}>Switch Language <DownOutlined /></h3>
        </Dropdown>
      </header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button style={{ margin: 50 }} onClick={() => fetchResources()} type="primary">Import Resources</Button>
        <Button style={{ margin: 50 }} onClick={() => modifyResources()} type="primary">Modify Dutch Resources</Button>
        <Button style={{ margin: 50 }} onClick={() => exportData()} type="primary">Export Resources</Button>
      </div>
      {ShowTranslations &&
        <div style={{ textAlign: "center", marginTop: 50, backgroundColor: "#f2f2f2", height: "100%" }}>

          <h1>Active Language: {languages[ActiveLanguage]}</h1>
          <h2>Title text: {t('app_title')}</h2>
          <h2>Welcome text: {t('welcome_message')}</h2>
        </div>
      }
    </div>
  )

}