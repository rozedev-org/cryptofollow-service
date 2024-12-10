import { OpenAPIObject } from '@nestjs/swagger';
import axios from 'axios';

import { convert } from 'openapi-to-postmanv2';
import { Logger } from '@nestjs/common';
import { removeIds } from '../id.utils';
export async function updatePostmanCollection({
  swagger,
  apiKey,
  collectionId,
  host,
}: {
  swagger: OpenAPIObject;
  apiKey: string;
  collectionId: string;
  host: string;
}) {
  const postmanCollection = await convertOpenApiToPostman(swagger);
  const response = await axios.put(
    `${host}/collections/${collectionId}`,
    {
      collection: postmanCollection,
    },
    {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    },
  );

  Logger.log('Postman actualizado:', response.data);
}

const convertOpenApiToPostman = (swagger: OpenAPIObject) => {
  return new Promise((resolve, reject) => {
    convert(
      { type: 'string', data: JSON.stringify(swagger) },
      { folderStrategy: 'Tags' },
      (err, conversionResult) => {
        if (err) {
          reject(err);
        }
        if (!conversionResult.result) {
          reject(new Error(conversionResult.reason));
        } else {
          const { info, item } = conversionResult.output[0].data as any;
          let result = {
            info: {
              name: info.name,
              schema: info.schema,
              description: info.description.content,
            },
            item,
          };
          result = removeIds(result);
          resolve(result);
        }
      },
    );
  });
};
