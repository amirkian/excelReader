using System;
using System.Collections.Generic;
using System.Text;

using JsonProcessingException = com.fasterxml.jackson.core.JsonProcessingException;
using ObjectMapper = com.fasterxml.jackson.databind.ObjectMapper;
namespace Business
{
  public class CryptoUtils
  {
    private static readonly ObjectMapper mapper = new ObjectMapper();
    public static sbyte[] hexStringToByteArray(string s)
    {
      int len = s.Length;
      sbyte[] data = new sbyte[len / 2];
      for (int i = 0; i < len; i += 2)
      {
        data[i / 2] = (sbyte)((Character.digit(s[i], 16) << 4) + Character.digit(s[i + 1], 16));
      }
      return data;
    }
    public static string normalJson(object @object, IDictionary<string, object> header)
    {
      if (@object == null && header == null)
      {
        return null;
      }
      IDictionary<string, object> map = null;
      if (@object != null)
      {
        if (@object is string)
        {
          try
          {
            @object = mapper.readValue((string)@object, typeof(object));
          }
          catch (JsonProcessingException e)
          {
            throw new Exception(e.Message);
          }
        }
        if (@object is System.Collections.ICollection)
        {
          PacketsWrapper packetsWrapper = new PacketsWrapper((System.Collections.ICollection)@object);
          map = mapper.convertValue(packetsWrapper, typeof(System.Collections.IDictionary));
        }
        else
        {
          map = mapper.convertValue(@object, typeof(System.Collections.IDictionary));
        }
      }
      if (map == null && header != null)
      {
        map = header;
      }
      if (map != null && header != null)
      {
        foreach (KeyValuePair<string, object> entry in header.SetOfKeyValuePairs())
        {
          map[entry.Key] = entry.Value;
        }
      }
      IDictionary<string, object> result = new Dictionary<string, object>();
      flatMap(result, null, map);
      StringBuilder sb = new StringBuilder();
      IList<string> keys = new List<string>(result.Keys);
      keys.Sort(Collator.getInstance(Locale.ENGLISH));
      foreach (string key in keys)
      {
        string textValue;
        object value = result[key];
        if (value != null)
        {
          textValue = value.ToString();
          if (string.ReferenceEquals(textValue, null) || textValue.Equals(""))
          {
            textValue = "#";
          }
          else
          {
            textValue = textValue.replaceAll("#", "##");
          }
        }
        else
        {
          textValue = "#";
        }
        sb.Append(textValue).Append('#');
      }
      return sb.Remove(sb.Length - 1, 1).ToString();
    }
    private static string getKey(string rootKey, string myKey)
    {
      if (!string.ReferenceEquals(rootKey, null))
      {
        return rootKey + "." + myKey;
      }
      else
      {
        return myKey;
      }
    }
    private static void flatMap(IDictionary<string, object> result, string rootKey, object input)
    {
      if (input is System.Collections.ICollection)
      {
        System.Collections.ICollection list = (System.Collections.ICollection)input;
        int i = 0;
        foreach (object e in list)
        {
          string key = getKey(rootKey, "E" + i++);
          flatMap(result, key, e);
        }
      }
      else if (input is System.Collections.IDictionary)
      {
        IDictionary<string, object> map = (System.Collections.IDictionary)input;
        foreach (KeyValuePair<string, object> entry in map.SetOfKeyValuePairs())
        {
          flatMap(result, getKey(rootKey, entry.Key), entry.Value);
        }
      }
      else
      {
        result[rootKey] = input;
      }
    }
    private class PacketsWrapper
    {
      internal System.Collections.ICollection packets;
      public PacketsWrapper()
      {
      }
      public PacketsWrapper(System.Collections.ICollection packets)
      {
        this.packets = packets;
      }
      public virtual System.Collections.ICollection Packets
      {
        get
        {
          return packets;
        }
        set
        {
          this.packets = value;
        }
      }
    }
  }
}
