import { React, useState, useContext } from "react";
import "./AddBook.css";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { AddFormContext } from "../../Context/formContext";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";

// form components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip"; // for book-tag
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import Fab from "@mui/material/Fab";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// Icons
import CloseIcon from "@material-ui/icons/ArrowDropUpRounded";
import OpenIcon from "@material-ui/icons/ArrowDropDownRounded";
import BookIcon from "@material-ui/icons/MenuBookRounded";
import BookDescIcon from "@material-ui/icons/DescriptionRounded";
import BookQtyIcon from "@material-ui/icons/InboxRounded";
import PriceIcon from "@material-ui/icons/MonetizationOn";
import AddressIcon from "@material-ui/icons/ContactsRounded";
import TagIcon from "@material-ui/icons/LocalOfferRounded";
import CameraIcon from "@material-ui/icons/AddAPhotoRounded";
import SendIcon from "@material-ui/icons/SendRounded";
import AddIcon from "@material-ui/icons/AddCircleOutlineRounded";
import EditionIcon from "@material-ui/icons/Timelapse";
import AuthorIcon from "@material-ui/icons/Person";
import WeightIcon from "@material-ui/icons/FitnessCenter";
import LanguageIcon from "@material-ui/icons/Translate";
import ISBNIcon from "@material-ui/icons/Language";
import YouTubeIcon from "@material-ui/icons/YouTube";

const AddBook = (props) => {
  const history = useHistory();
  const [addForm, setAddForm] = useContext(AddFormContext);

  // functionality states
  const [checked, setChecked] = useState(false);
  const [collapse, setcollapse] = useState(true);
  const [sending, setSending] = useState(false);
  const [tagFieldChanges, settagFieldChanges] = useState(false);
  const [openTagMenu, setOpenTagMenu] = useState(false);

  // Add book form states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("");
  const [SP, setSP] = useState("");
  const [mrp, setMrp] = useState("");
  const [bookDesc, setbookDesc] = useState("");
  const [Weight, setWeight] = useState("");
  const [Edition, setEdition] = useState("");
  const [Qnty, setQnty] = useState(1);
  const [author, setAuthor] = useState("");
  const [pickupId, setPickupId] = useState("");
  const [Adr, setAdr] = useState("");
  const [tags, setTags] = useState([]);
  const [resulttags, setresultTags] = useState([]);
  const [tag, setTag] = useState("");
  const [link, setlink] = useState("");
  const [lang, setlang] = useState("");
  const [Photo, setPhoto] = useState([]);
  const [Image, setImage] = useState([]);

  // tag searching on input
  const handelTagSearch = (e) => {
    settagFieldChanges(true);
    setTag(e.target.value);
    setOpenTagMenu(true);
    const fetchdata = async () => {
      axios
        .get(`/searchTag?q=${e.target.value}`)
        .then((response) => {
          setresultTags(response.data);
          settagFieldChanges(false);
        })
        .catch((error) => {});
    };
    fetchdata();
  };

  // Tag adding to Book Tags
  const handelTagAdd = (tagname) => {
    if (tagname !== "" && tagname !== undefined && tagname !== null) {
      setTags(tags.concat(tagname));
    }
    setOpenTagMenu(false);
    setTag("");
  };

  // Deleting Tags of Book
  const handleTagDelete = (tagname) => {
    setTags(tags.filter((tag) => tagname !== tag));
  };

  // adding book images in form
  const UpdateFileList = (fileList) => {
    setPhoto(fileList);
    setImage(fileList);
  };
  const handelbookAdd = (e, uploadMultiple) => {
    if (Image.length > 0 && uploadMultiple) {
      UpdateFileList([...Array.from(e.target.files), ...Image]);
    } else {
      UpdateFileList(Array.from(e.target.files));
    }
  };

  // deleting book images from form
  const handleImageDelete = (filename) => {
    setImage(Image.filter((file) => file.name !== filename));
    setPhoto(Image.filter((file) => file.name !== filename));
  };

  // submitting book for review
  const handelBookSubmitRequest = () => {
    if (checked) {
      setSending(!sending);
      axios
        .post("/addBook", {
          title: bookName,
          MRP: mrp,
          price: SP,
          editionYear: Edition,
          author: author,
          ISBN: bookISBN,
          language: lang,
          pickupAddressId: Adr,
          description: bookDesc,
          photos: Photo,
          weightInGrams: Weight,
          embedVideo: link,
          tags: tags,
          qty: Qnty,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
    }
  };

  return (
    <div className="add-book-bg">
      <Grid container spacing={2} style={{ padding: "10px" }}>
        <Grid item xs={12} lg={8} md={12} sm={12}>
          <form className="add-book-form-lf">
            <fieldset>
              <legend>Add New Book</legend>
              <Stack spacing={2}>
                <TextField
                  id="add-book-textfield"
                  label="Book Title"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  value={bookName}
                  onChange={(e) => setbookName(e.target.value)}
                />
                <TextField
                  id="add-book-textfield"
                  label="Book Details"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookDescIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  multiline
                  maxRows={3}
                  helperText="About the book such as Year of purchase, quality etc"
                  value={bookDesc}
                  onChange={(e) => setbookDesc(e.target.value)}
                />
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Quantity"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BookQtyIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={Qnty}
                    onChange={(e) => setQnty(e.target.value)}
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book Selling Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={SP}
                    onChange={(e) => setSP(e.target.value)}
                  />
                  <TextField
                    select
                    label="Pickup Address"
                    value={Adr}
                    onChange={(e) => {
                      setAdr(e.target.value);
                      if (e.target.value === "NEWADR") {
                        history.push("/SellerPanel/3");
                      }
                    }}
                    helperText="Please select your address for Book Pickup"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddressIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {props.address.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.address + ", " + option.zipCode}
                      </MenuItem>
                    ))}
                    {
                      <MenuItem key={"NEWADR"} value={"NEWADR"}>
                        {"Add New Address"}
                      </MenuItem>
                    }
                  </TextField>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  spacing={2}
                >
                  <div style={{ position: "relative" }}>
                    <TextField
                      id="add-book-textfield"
                      label="Book Tags"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TagIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            {tagFieldChanges ? (
                              <CircularProgress
                                style={{
                                  color: "rgba(0,0,0,0.6)",
                                  height: "15px",
                                  width: "15px",
                                  marginRight: "15px",
                                }}
                              />
                            ) : (
                              <></>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      value={tag}
                      onChange={(e) => handelTagSearch(e)}
                      helperText="Press Enter key to Add the Tag"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelTagAdd(e.target.value);
                        }
                      }}
                      autoComplete="false"
                    />
                    <ClickAwayListener
                      onClickAway={() => setOpenTagMenu(false)}
                    >
                      {openTagMenu ? (
                        <div className="searchTagresult">
                          {resulttags.map((TAG, idx) => (
                            <MenuItem
                              id="result-tag"
                              title={TAG.tag}
                              key={idx}
                              value={TAG.tag}
                              onClick={() => handelTagAdd(TAG.tag)}
                            >
                              {TAG.tag}
                            </MenuItem>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </ClickAwayListener>
                  </div>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    {tags.map((TAG, idx) => (
                      <Chip
                        label={TAG}
                        key={idx}
                        onDelete={() => handleTagDelete(TAG)}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Stack>
                </Stack>
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <div style={{ display: "flex" }}>
                    <label htmlFor="icon-button-file">
                      <input
                        accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          handelbookAdd(e, false);
                        }}
                        multiple
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <CameraIcon />
                      </IconButton>
                    </label>
                    <Alert severity="info">
                      Please Upload Atleast 3 Clear Images of Book
                    </Alert>
                  </div>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    {Image.map((file, idx) => (
                      <div className="uploaded-image-item" key={idx}>
                        <span
                          className="image-delete"
                          onClick={() => handleImageDelete(file.name)}
                        >
                          <CancelIcon />
                        </span>
                        <Avatar
                          alt={file.name}
                          src={URL.createObjectURL(file)}
                          sx={{ width: 150, height: 150 }}
                          variant="square"
                        />
                      </div>
                    ))}
                    {Image.length ? (
                      <label htmlFor="icon-button-file-2">
                        <input
                          accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
                          id="icon-button-file-2"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            handelbookAdd(e, true);
                          }}
                          multiple
                        />
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <AddIcon style={{ height: "2rem", width: "2rem" }} />
                        </IconButton>
                      </label>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </fieldset>
          </form>
        </Grid>
        <Grid item xs={12} lg={4} md={12} sm={12} style={{ padding: "10px" }}>
          <Tooltip
            title="Fill Extra Details about book. However these fields are not Necessary"
            arrow
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={collapse ? <CloseIcon /> : <OpenIcon />}
              onClick={() => setcollapse(!collapse)}
              fullWidth
              style={{
                margin: "30px 10px",
                fontFamily: "PT sans",
                fontSize: "12px",
                letterSpacing: "1px",
              }}
            >
              More Details
            </Button>
          </Tooltip>

          <Collapse in={collapse}>
            <form className="add-book-form-rt">
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-evenly"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book MRP"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book Edition Year"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EditionIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={Edition}
                    onChange={(e) => setEdition(e.target.value)}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-evenly"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Author"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AuthorIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book Weight in Grams"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WeightIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={Weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-evenly"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Language"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={lang}
                    onChange={(e) => setlang(e.target.value)}
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book ISBN Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ISBNIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={bookISBN}
                    onChange={(e) => setbookISBN(e.target.value)}
                  />
                </Stack>
                {/* <TextField
                  id="add-book-textfield"
                  label="Embed Youtube Video Link of Book"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTubeIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  multiline
                  maxRows={3}
                  helperText="Make a video of book and Upload it to Youtube and share the video's embed Link"
                  value={link}
                  onChange={(e) => setlink(e.target.value)}
                /> */}
              </Stack>
            </form>
          </Collapse>
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          md={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          <b style={{ fontFamily: "pt sans" }}>I agree to Terms & Conditions</b>
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          md={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingButton
            onClick={() => {
              handelBookSubmitRequest();
            }}
            endIcon={<SendIcon />}
            loading={sending}
            loadingPosition="end"
            variant="contained"
            style={{
              fontFamily: "PT sans",
              fontSize: "12px",
              letterSpacing: "1px",
            }}
          >
            Submit For Review
          </LoadingButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default AddBook;
