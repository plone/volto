import type { BlockEditProps } from '@plone/types';
import { useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import mapsBlockSVG from './block-maps.svg';
import { useTranslation } from 'react-i18next';
import { ArrowrightIcon, CloseIcon } from '@plone/components/Icons';

const MapsBlockEdit = (props: BlockEditProps) => {
  const { t } = useTranslation();

  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  const { onChangeBlock, data, block, selected } = props;
  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  const onSubmitUrl = useCallback(() => {
    onChangeBlock(block, {
      ...data,
      url: getSrc(url),
    });
  }, [onChangeBlock, block, data, url]);

  const onKeyDownVariantMenuForm = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onSubmitUrl();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Do something on ESC key
      }
    },
    [onSubmitUrl],
  );

  const getSrc = (embed) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(embed, 'text/html');
    const iframe = doc.getElementsByTagName('iframe');
    if (iframe.length === 0) {
      setError(true);
      return '';
    }
    setError(false);
    return iframe[0].src;
  };

  const placeholder = useMemo(
    () => data.placeholder || t('blocks.maps.maps-block-input-placeholder'),
    [data, t],
  );

  return (
    <div
      className={clsx(
        'maps align block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <div
          className={clsx('maps-inner', {
            'w-full': data.align === 'full',
          })}
        >
          <iframe
            title={t('blocks.maps.google-maps-embedded-block')}
            src={data.url}
            className="google-map aspect-video"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ) : (
        <div>
          <div
            className={`
              flex w-full flex-col items-center justify-center gap-6 bg-quanta-snow px-4 py-6
            `}
          >
            <div className="mb-8 flex h-32 w-32 items-center justify-center bg-white p-4">
              <img src={mapsBlockSVG} alt="" />
            </div>
            <div
              className={`mb-6 flex w-[380px] max-w-full items-center bg-white px-4 py-3 shadow-sm`}
            >
              {' '}
              <input
                onKeyDown={onKeyDownVariantMenuForm}
                onChange={onChangeUrl}
                placeholder={placeholder}
                value={url}
                // Prevents propagation to the Dropzone and the opening
                // of the upload browser dialog
                onClick={(e) => e.stopPropagation()}
                className="flex-1 outline-hidden"
              />
              <div className="ml-2 flex items-center gap-3">
                {url && (
                  <button
                    className={`
                      flex items-center justify-center transition-opacity
                      hover:opacity-75
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      setUrl('');
                    }}
                  >
                    <CloseIcon className="size-6 text-gray-400" />
                  </button>
                )}
                <button
                  className={`
                    flex items-center justify-center transition-opacity
                    hover:opacity-75
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubmitUrl();
                  }}
                >
                  <ArrowrightIcon className="size-6 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="mt-2 mb-2 text-center text-gray-500">
              <p>{t('blocks.maps.instructions')}</p>
              {error && (
                <div>
                  <p className="text-red-700">{t('blocks.maps.code-error')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!selected && <div className="map-overlay" />}
    </div>
  );
};

export default MapsBlockEdit;
