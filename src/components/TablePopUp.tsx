import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

type TablePropTypes = {
  setShowPopup: (show: boolean) => void;
  showPopup: boolean;
  clearValues: () => void;
  handleAddOrUpdate: () => void;
  EditId: number | null;
  setValueOne: (value: string) => void;
  valueOne?: string | null;
  setValueTwo: (value: string) => void;
  valueTwo?: string | null;
  setValueThree: (value: string) => void;
  valueThree?: string | null;
  setValueFour: (value: string) => void;
  valueFour: string | null;
  labelOne: string;
  labelTwo: string;
  LabelThree: string;
  LabelFour: string;
  addMsg: string;
  editMsg: string;
  deleteConfirmation: boolean;
  setDeleteConfirmation: (show: boolean) => void;
  deletFun: () => void; 
  deletLabel:string
};

const TablePopUp: React.FC<TablePropTypes> = ({
  setShowPopup,
  showPopup,
  clearValues,
  handleAddOrUpdate,
  EditId,
  setValueOne,
  valueOne,
  setValueTwo,
  valueTwo,
  setValueThree,
  valueThree,
  setValueFour,
  valueFour,
  labelOne,
  labelTwo,
  LabelThree,
  LabelFour,
  addMsg,
  editMsg,
  deleteConfirmation,
  setDeleteConfirmation,
  deletFun ,
  deletLabel
}) => {
  return (
    <>
     <div>
     {showPopup && (
        <Dialog
          open={showPopup}
          onClose={() => setShowPopup(false)}
          maxWidth="sm"
          sx={{ background: '#f5f0ef ' }}
        >
          <Box>
            <DialogTitle
              style={{
                color: 'red',
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '20px',
                fontSize: '30px',
              }}
            >
              {EditId ? editMsg : addMsg}
            </DialogTitle>
          </Box>
          <DialogContent style={{ padding: '50px 50px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={labelOne}
                  value={valueOne}
                  onChange={(e) => setValueOne(e.target.value)}
                  fullWidth
                />
              </Grid>
              {labelTwo && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={valueTwo}
                    onChange={(e) => setValueTwo(e.target.value)}
                    label={labelTwo}
                    fullWidth
                  />
                </Grid>
              )}

              {LabelThree && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={valueThree}
                    onChange={(e) => setValueThree(e.target.value)}
                    label={LabelThree}
                    fullWidth
                  />
                </Grid>
              )}
              {LabelFour && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={valueFour}
                    onChange={(e) => setValueFour(e.target.value)}
                    label={LabelFour}
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: '43px' }}>
            <Button
              style={{
                background: '#FFFDFF',
                color: 'red',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              }}
              onClick={clearValues}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: 'red',
                color: 'white',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
              }}
              onClick={handleAddOrUpdate}
            >
              {EditId ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
     </div>
     <div>
     {deleteConfirmation && (
          <Dialog
            open={deleteConfirmation}
            onClose={() => setDeleteConfirmation(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
            {deletLabel}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={deletFun} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
     </div>
    </>
  );
};

export default TablePopUp;
