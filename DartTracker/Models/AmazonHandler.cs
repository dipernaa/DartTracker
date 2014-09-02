using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.Runtime;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace DartTracker.Models
{

    /// <summary>
    /// Handles the communication between the website and Amazon Web Service's DynamoDB
    /// </summary>
    public class AmazonHandler
    {

        /// <summary>
        /// Gets the DynamoDB client to communicate with Amazon Web Services
        /// </summary>
        /// <returns>DynamoDB client</returns>
        public AmazonDynamoDBClient getClient()
        {
            AmazonDynamoDBConfig config = new AmazonDynamoDBConfig();
            config.AuthenticationRegion = "us-west-2";
            config.RegionEndpoint = RegionEndpoint.USWest2;
            return new AmazonDynamoDBClient(new BasicAWSCredentials("AKIAJUXTEC6YH6EGO6YQ",
                "5f1NOSq1vWJ7jmbR9Grjm8udLFd55knXwVU486iK"), config);
        }

        /// <summary>
        /// Adds a item to the specified table in DynamoDB
        /// </summary>
        /// <typeparam name="T">General type</typeparam>
        /// <param name="item">General item to be added to the specified table in DynamoDB</param>
        /// <param name="tableName">Specific table in DynamoDB to add item to</param>
        public void addItem<T>(T item, string tableName)
        {
            var client = getClient();
            Dictionary<string, AttributeValue> props;

            props = new Dictionary<string, AttributeValue>();
            foreach (PropertyInfo prop in item.GetType().GetProperties())
            {
                props.Add(prop.Name, new AttributeValue { S = (string)prop.GetValue(item, null) });
            }
            var request = new PutItemRequest
            {
                TableName = tableName,
                Item = props
            };
            client.PutItem(request);
        }

        /// <summary>
        /// Querys a specific table in DynamoDB with the same id as that passed in
        /// </summary>
        /// <param name="tableName">Table to be queried in DyanmoDB</param>
        /// <param name="id">ID that has to match</param>
        /// <returns>Results of the query</returns>
        public QueryResponse queryTable(string tableName, string id)
        {
            var client = getClient();
            var request = new QueryRequest
            {
                TableName = tableName,
                KeyConditions = new Dictionary<string, Condition>()
                {
                    {
                        "ID",
                        new Condition()
                        {
                            ComparisonOperator = "EQ",
                            AttributeValueList = new List<AttributeValue>()
                            {
                                new AttributeValue { S = id }
                            }
                        }
                    }
                }
            };

            return client.Query(request); ;
        }

        /// <summary>
        /// Makes a JSON array from a list of dictionary objects
        /// </summary>
        /// <param name="list">List of dictionary objects</param>
        /// <returns>JSON array that was composed from the list</returns>
        public JArray makeJArray(IList<Dictionary<string, AttributeValue>> list)
        {
            JObject temp;
            JArray array = new JArray();
            foreach (IDictionary<string, AttributeValue> item in list)
            {
                temp = new JObject();
                string[] keyArray = item.Keys.ToArray();
                for (int i = 0; i < item.Keys.Count; i++)
                {
                    temp.Add(keyArray[i], item[keyArray[i]].S);
                }
                array.Add(temp);
            }

            return array;
        }
    }
}