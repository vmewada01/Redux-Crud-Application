import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getTagsList } from "../Redux/AppReducer/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const tagLists = useSelector((state) => state.AppReducer.tags);
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState(
    searchParams.getAll("tags") || []
  );

  const handleTagChange = (value) => {
    //if the tag is selected remove it, else add it.
    let newTags = [...selectedTags];
    if (selectedTags.includes(value)) {
      newTags.splice(newTags.indexOf(value), 1);
    } else {
      newTags.push(value);
    }
    setSelectedTags(newTags);
    setSearchParams({ tags: newTags });
  };

  useEffect(() => {
    if (tagLists.length === 0) {
      dispatch(getTagsList());
    }
  }, [dispatch, tagLists.length]);

  return (
    <Box
      border="1px solid rgba(0,0,0,0.1)"
      width="250px"
      height="95vh"
      marginTop="1rem"
      padding="0.25rem"
    >
      <Flex direction="column" height="inherit">
        <Box height="15%" border="1px solid rgba(0,0,0,0.1)">
          {/* userprofile */}
        </Box>
        <Box minHeight="70%" border="1px solid rgba(0,0,0,0.1)">
          <Flex direction="column" gap="5px">
            <Box
              boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
              padding="5px 0px"
              cursor="pointer"
              onClick={() => {
                handleTagChange("All");
              }}
              backgroundColor={
                selectedTags.includes("All") ? "blue.400" : "blue.100"
              }
              color={selectedTags.includes("All") ? "white" : "black"}
            >
              <Flex>
                <Text>All</Text>
                <Text>{tasks.length}</Text>
              </Flex>
            </Box>
            {tagLists.length > 0 &&
              tagLists.map((tagObj) => {
                return (
                  <Box
                    key={tagObj.id}
                    boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
                    padding="5px 0px"
                    cursor="pointer"
                    onClick={() => {
                      handleTagChange(tagObj.tag);
                    }}
                    backgroundColor={
                      selectedTags.includes(tagObj.tag)
                        ? "purple.400"
                        : "purple.100"
                    }
                    color={
                      selectedTags.includes(tagObj.tag) ? "white" : "black"
                    }
                  >
                    <Flex>
                      <Text>{tagObj.tag}</Text>
                      <Text>
                        {
                          tasks.filter((item) => item.tags.includes(tagObj.tag))
                            .length
                        }
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
